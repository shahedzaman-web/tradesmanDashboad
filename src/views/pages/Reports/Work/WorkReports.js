// import React from "react";
// // reactstrap components
// import {
//   Badge,
//   Card,
//   Container,
//   CardHeader,
//   Row,
//   Col,
//   Media,
//   Progress,
//   Table
// } from "reactstrap";
// import { onSnapshot, collection } from "firebase/firestore";
// import SimpleHeader from "components/Headers/SimpleHeader";
// import { db } from "Firebase/firebase.config";

// function WorkReports() {


//   // const collectionRef = collection(db, "posts");

//   const [posts, setPosts] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);

//   const q = query();

//   React.useLayoutEffect(() => {
//     const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
//       const items = [];
//       QuerySnapshot.forEach((doc) => {

//         items.push({ _id: doc.id, ...doc.data() });
//       });
//       setPosts(items);
//       setLoading(false);
//     });

//     return () => {
//       unSub();
//     };
//   }, [collectionRef])


//   const Delete = (id) => {
//     console.log(id);
//   }

//   if (loading) {
//     return <h1>Loading</h1>
//   }

//   else {
//     return (
//       <>
//         <SimpleHeader name="Reports" parentName="Reports List" />
//         <Container className="mt--6" fluid>
//           <Card>
//             <CardHeader className="border-0">
//               <Row>
//                 <Col xs="6">
//                   <h3 className="mb-0">POSTS</h3>
//                 </Col>
//               </Row>
//             </CardHeader>

//             <Table className="align-items-center table-flush" responsive>
//               <thead className="thead-light">
//                 <tr>
//                   <th scope="col">Reported By</th>
//                   <th scope="col">Reported By</th>
//                   <th scope="col">Reported User</th>
//                   <th scope="col">Title</th>
//                   <th scope="col">Description</th>
//                   <th scope="col" />
//                 </tr>
//               </thead>
//               <tbody>
//                 {
//                   posts.map(post => <tr key={post._id}>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             {post.des}
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>{post.author}</td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-warning" />
//                         {post.status}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-warning" />
//                         {post.reports}
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">60%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="60"
//                             barClassName="bg-danger"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="table-actions">
//                       <button
//                         aria-label="Close"
//                         className="close"
//                         data-dismiss="modal"
//                         type="button"
//                       >
//                         <span aria-hidden={true}><i className="fas fa-eye" /></span>
//                       </button>
//                     </td>
//                   </tr>)
//                 }
//               </tbody>
//             </Table>
//           </Card>
//         </Container>
//       </>
//     );
//   }
// }

// export default WorkReports