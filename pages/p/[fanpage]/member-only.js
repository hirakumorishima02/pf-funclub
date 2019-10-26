import withAuthMember from "../../../lib/helpers/withAuthMember";
const MemberOnly = () => {
  return <h1>products/[fanpage]/member-only</h1>;
};
export default withAuthMember(MemberOnly);