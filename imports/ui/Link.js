import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';
// export default class Link extends React.Component {
//   constructor(props){
//     super(props);
//   }
  
//   render() {
//     return (
//       <div>
       
//         <PrivateHeader title = "Your Links"/>

//         <LinksList/>
        
//         <AddLink/>
       
//       </div>
//     );
//   }
// }

// stateless functional component..

const Link = () => {
  return (
    <div>
     
      <PrivateHeader title = "Your Links"/>
      
      <div className="page-content">

        <LinksListFilters/>

        <AddLink/>

        <LinksList/>

      </div>
    </div>
  );
}

export default Link;
