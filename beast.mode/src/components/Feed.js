import React from 'react'
import Post from './Post'

// Just for testing purpose
const posts0 = [
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"}
]

const posts1 = [
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY WOOO fafas faf afasf afawfas faww fwafawf mfrh rt h r es fse t e tewa s trwa r"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"},
  { user: "Miksa",
    content: "KILLER WORKOUT TODAY"}
]

const Feed = (props) => {
  return ( <div>
    <table width='100%'><tbody>
      <tr><td align='top' width='50%'>
        {posts0.map(post => <Post key={post.content} post={post} />)}
      </td>
      <td align='top' width='50%'>
        {posts1.map(post => <Post key={post.content} post={post} />)}
      </td></tr>
    </tbody></table>
  </div> )
}

export default Feed