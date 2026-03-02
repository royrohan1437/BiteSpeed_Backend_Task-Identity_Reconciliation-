// import { prisma } from "../prisma";

// export const identifyContact = async (
//  email?:string,
//  phoneNumber?:string
// )=>{

//  const matches = await prisma.contact.findMany({

//   where:{
//    OR:[
//     {email:email || undefined},
//     {phoneNumber:phoneNumber || undefined}
//    ]
//   },

//   orderBy:{
//    createdAt:"asc"
//   }

//  });

//  if(matches.length===0){

//   const newContact=await prisma.contact.create({

//    data:{
//     email,
//     phoneNumber,
//     linkPrecedence:"primary"
//    }

//   });

//   return buildResponse([newContact]);

//  }

//  let primary = matches[0];

//  const emailExists=matches.some(c=>c.email===email);

//  const phoneExists=matches.some(c=>c.phoneNumber===phoneNumber);

//  if(!emailExists || !phoneExists){

//   await prisma.contact.create({

//    data:{
//     email,
//     phoneNumber,
//     linkedId:primary.id,
//     linkPrecedence:"secondary"
//    }

//   });

//  }

//  const allContacts=await prisma.contact.findMany({

//   where:{
//    OR:[
//     {id:primary.id},
//     {linkedId:primary.id}
//    ]
//   }

//  });

//  return buildResponse(allContacts);

// };

// const buildResponse=(contacts:any[])=>{

//  const primary=contacts[0];

//  return{

//   contact:{

//    primaryContatctId:primary.id,

//    emails:[...new Set(contacts.map(c=>c.email).filter(Boolean))],

//    phoneNumbers:[...new Set(contacts.map(c=>c.phoneNumber).filter(Boolean))],

//    secondaryContactIds:contacts
//    .filter(c=>c.linkPrecedence==="secondary")
//    .map(c=>c.id)

//   }

//  };

// };

import { prisma } from "../prisma";

export const identifyContact = async (
  email?: string,
  phoneNumber?: string
) => {

  const matches = await prisma.contact.findMany({
    where: {
      OR: [
        { email: email || undefined },
        { phoneNumber: phoneNumber || undefined }
      ]
    },
    orderBy: {
      createdAt: "asc"
    }
  });


  if(matches.length === 0){

    const newContact = await prisma.contact.create({
      data:{
        email,
        phoneNumber,
        linkPrecedence:"primary"
      }
    });

    return buildResponse([newContact]);

  }


  let primary = matches[0];


  const primaries = matches.filter(
    c => c.linkPrecedence === "primary"
  );

  for(const p of primaries){

    if(p.id !== primary.id){

      await prisma.contact.update({

        where:{ id:p.id },

        data:{
          linkPrecedence:"secondary",
          linkedId: primary.id
        }

      });

    }

  }



  const emailExists = matches.some(
    c => c.email === email
  );

  const phoneExists = matches.some(
    c => c.phoneNumber === phoneNumber
  );


  if(!emailExists || !phoneExists){

    await prisma.contact.create({

      data:{
        email,
        phoneNumber,
        linkedId: primary.id,
        linkPrecedence:"secondary"
      }

    });

  }


  const allContacts = await prisma.contact.findMany({

    where:{
      OR:[
        { id: primary.id },
        { linkedId: primary.id }
      ]
    },

    orderBy:{
      createdAt:"asc"
    }

  });


  return buildResponse(allContacts);

};



const buildResponse = (contacts:any[])=>{

  const primary = contacts.find(
    c=>c.linkPrecedence==="primary"
  );


  const emails = [
    ...new Set(
      contacts
      .map(c=>c.email)
      .filter(Boolean)
    )
  ];


  const phones = [
    ...new Set(
      contacts
      .map(c=>c.phoneNumber)
      .filter(Boolean)
    )
  ];


  const secondaryIds = contacts
  .filter(c=>c.linkPrecedence==="secondary")
  .map(c=>c.id);



  return{

    contact:{

      primaryContatctId:primary.id,

      emails,

      phoneNumbers:phones,

      secondaryContactIds:secondaryIds

    }

  };

};