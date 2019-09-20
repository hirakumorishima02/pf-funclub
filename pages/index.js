import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

// プロファイルとページネーションデータを受け取り、propsとして利用できるようにする
HomePage.getInitialProps = async ({ req, query }) => {
  // 要求がサーバー側から行われているかクライアント側から行われているかを確認
  const protocol = req
    ? `${req.headers['x-forwarded-proto']}:`
    : location.protocol
  const host = req ? req.headers['x-forwarded-host'] : location.host
  // クエリパラメータを使用して、プロファイルのAPIにリクエストを行う
  const pageRequest = `${protocol}//${host}/api/posts?page=${query.page ||
    1}&limit=${query.limit || 9}`
  const res = await fetch(pageRequest)
  const json = await res.json()
  return json
}

function HomePage({ posts, page, pageCount }) {
  return (
    <>
      <ul>
        {posts.map(p => (
          <li className="post" key={p.id}>
            <Link href={`/post?id=${p.id}`}>
              <a>
                <img src={p.avatar} />
                <span>{p.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <nav>
        {page > 1 && (
          <Link href={`/?page=${page - 1}&limit=9`}>
            <a>Previous</a>
          </Link>
        )}
        {page < pageCount && (
          <Link href={`/?page=${page + 1}&limit=9`}>
            <a className="next">Next</a>
          </Link>
        )}
      </nav>
    </>
  )
}

export default HomePage