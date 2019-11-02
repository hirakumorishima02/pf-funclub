const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const adminEmail = functions.config().admin.email;

const stripe = require("stripe")(functions.config().stripe.token);
const currency = functions.config().stripe.currency || "JPY";

exports.createStripeCustomer = functions.auth.user().onCreate(async user => {
  const customer = await stripe.customers.create({ email: user.email });
  return admin
    .firestore()
    .collection("stripe_customers")
    .doc(user.uid)
    .set({ customer_id: customer.id });
});

exports.addPaymentSource = functions.firestore
  .document("/stripe_customers/{userId}/tokens/{pushId}")
  // eslint-disable-next-line consistent-return
  .onCreate(async (snap, context) => {
    const source = snap.data();
    const token = source.token;
    if (source === null) {
      return null;
    }

    try {
      const snapshot = await admin
        .firestore()
        .collection("stripe_customers")
        .doc(context.params.userId)
        .get();
      const customer = snapshot.data().customer_id;
      const response = await stripe.customers.createSource(customer, {
        source: token
      });
      return admin
        .firestore()
        .collection("stripe_customers")
        .doc(context.params.userId)
        .collection("sources")
        .doc(response.fingerprint)
        .set(response, { merge: true });
    } catch (error) {
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
      console.error(error);
      console.log(`user: ${context.params.userId}`);
    }
  });

exports.cleanupUser = functions.auth.user().onDelete(async (user) => {
  const snapshot = await admin.firestore().collection('stripe_customers').doc(user.uid).get();
  const customer = snapshot.data();
  await stripe.customers.del(customer.customer_id);
  return admin.firestore().collection('stripe_customers').doc(user.uid).delete();
});

exports.createStripeCharge = functions.firestore
  .document("stripe_customers/{userId}/charges/{id}")
  .onCreate(async (snap, context) => {
    const val = snap.data();
    try {
      // Look up the Stripe customer id written in createStripeCustomer
      const snapshot = await admin
        .firestore()
        .collection(`stripe_customers`)
        .doc(context.params.userId)
        .get();
      const snapval = snapshot.data();
      const customer = snapval.customer_id;
      // Create a charge using the pushId as the idempotency key
      // protecting against double charges
      const idempotencyKey = context.params.id;
      const subscription = {
        customer: customer,
        items: [
          {
            plan: val.plan
          }
        ]
      };
      if (val.source !== null) {
        subscription.default_source = val.source;
      }

      const response = await stripe.subscriptions.create(subscription, {
        idempotency_key: idempotencyKey
      });
      // If the result is successful, write it back to the database
      await snap.ref.set(response, { merge: true });

      // 購入済みメンバーとして登録
      await admin
        .firestore()
        .collection("fanPages")
        .doc(val.fanpageId)
        .collection("members")
        .doc(context.params.userId)
        .set({ permission: "readonly" });

      // 購読者として登録

      var y = dt.getFullYear();
      var m = ("00" + (dt.getMonth()+1)).slice(-2);
      var d = ("00" + dt.getDate()).slice(-2);
      var today = y + "/" + m + "/" + d;

      var y2 = dt.getFullYear();
      var m2 = ("00" + (dt.getMonth()+2)).slice(-2);
      var d2 = ("00" + dt.getDate()).slice(-2);
      var nextMonth = y2 + "/" + m2 + "/" + d2;

      await admin
        .firestore()
        .collection("subscriptionMember")
        .doc(context.params.userId)
        .set({
          startDay: today,
          endDay  : nextMonth,
          fanPage : val.fanpageId,
          userId  : context.params.userId
        });
      return;
    } catch (error) {
      // We want to capture errors and render them in a user-friendly way, while
      // still logging an exception with StackDriver
      console.log(error);
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
      console.error(error);
      console.log(`user: ${context.params.userId}`);
    }
  });

function userFacingMessage(error) {
  return error.type
    ? error.message
    : "An error occurred, developers have been alerted";
}

exports.createProductPlan = functions.firestore
  .document("fanPages/{fanpage}")
  .onCreate(async (snap, context) => {
    const val = snap.data();
    console.log(val);
    const product = await stripe.products.create({
      name: val.artistName,
      type: "service",
    });

    const productId = product.id;

    const plans = {
      product: productId,
      currency: "jpy",
      interval: "month",
      interval_count: "1",
      usage_type: "licensed",
      billing_scheme: "per_unit",
      nickname: val.planName,
      amount: val.monthlyFee
    };
    const result = await stripe.plans.create(plans);

    await snap.ref.set({ plan: result.id }, { merge: true });
});

exports.addFanpageMember =
functions.firestore
.document("fanPages/{fanpageId}")
.onCreate(async (snap, context) => {
  const val = snap.data();
  try {
  await admin
  .firestore()
  .collection("fanPages")
  .doc(context.params.fanpageId)
  .collection("members")
  .doc(val.userId)
  .set({ permission: "pageOwner" });
  return;
} catch (error) {
  console.log(error);
  await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
  console.error(error);
  console.log(`user: ${context.params.userId}`);
}
});


// メールサーバー設定
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// 管理者用のメールテンプレート
const adminContents = data => {
  return `以下内容でホームページよりお問い合わせを受けました。

お名前：
${data.name}

メールアドレス：
${data.email}

内容：
${data.content}
`;
};

exports.sendMail = functions.https.onCall((data, context) => {
  // メール設定
  let adminMail = {
    from: gmailEmail,
    to: adminEmail,
    subject: "ホームページお問い合わせ",
    text: adminContents(data)
  };

  // 管理者へのメール送信
  mailTransport.sendMail(adminMail, (err, info) => {
    if (err) {
      return console.error(`send failed. ${err}`);
    }
    return console.log("send success.");
  });
});

// exports.removeMember = functions.pubsub.schedule('every 5 minutes').onRun( async (context) => {
//   var dt = new Date();
//   var y = dt.getFullYear();
//   var m = ("00" + (dt.getMonth()+1)).slice(-2);
//   var d = ("00" + dt.getDate()).slice(-2);
//   var today = y + "/" + m + "/" + d;
//   // 取得したドキュメントのuserIdを格納する
//     var result =
//     await admin
//     .firestore()
//     .collection("subscriptionMember")
//     .where("endDay", "==", today) 
//     .get()
//     // eslint-disable-next-line promise/always-return
//     .then(snapshot => {
//       snapshot.forEach(doc => {
//         admin
//         .firestore()
//         .collection("fanPages")
//         .doc(doc.data().fanPage)
//         .collection("members")
//         .doc(doc.data().userId)
//         .delete();
//         console.log("Deletion done!")
//       });
//     }).catch(error => {
//       console.log(error)
//     });
// });