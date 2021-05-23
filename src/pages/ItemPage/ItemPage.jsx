// import React from 'react'
// import { useParams } from 'react-router'
// import { useGet } from '../../hooks/get.hook'
// import Styles from './ItemPage.module.css'

// export const ItemPage = () => {

//     const { item } = useParams()
//     const itemId = item.replace('item=', '')

        // eslint-disable-next-line
//     const { data, loading } = useGet(`item/getById/${itemId}`)
//     console.log(data)

//     return (
//         <div className={Styles.itemPage}>
//             {/* {
//                 loading ?
//                 <div className={Styles.loading}>
//                     <div className="center">
//                         <div className="loading"></div>
//                     </div>
//                 </div> :
//                 <>
//                     <Header
//                         previous={data.subCategoryStatus === false ? 'menu' : `menu/category=${data.id}`}
//                         heading={
//                             data.name
//                         }
//                     />
//                     {
//                         data.subCategoryStatus === false ?
//                         <div className="container">
//                             <div className={Styles.block}>
//                                 {
//                                     data.subCategory !== undefined ?
//                                     data.subCategory.map((el, i) => {
//                                         return <Category key={el.id} data={el} i={ i } />
//                                     }) : ''
//                                 }
//                             </div>
//                         </div> : 
//                         <SubCategoryPage />
//                     }
//                 </>
//             } */}
//         </div>
//     )
// }
