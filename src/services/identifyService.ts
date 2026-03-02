export const identifyContact = async(
 email?:string,
 phoneNumber?:string
)=>{

 return {
  contact:{
   primaryContatctId:1,
   emails:[],
   phoneNumbers:[],
   secondaryContactIds:[]
  }
 };

};