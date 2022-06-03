const  messagebird  =  require ( 'messagebird' ) ( 'oN8gHQ3gvSL2RamNSpnm4nI4g' ) ;


const prueba_test = async function(req,res){
    res.status(200).send({message: 'HOLA TEST'});
}

const get_conversations = async function(req,res){
    const  messagebird  =  require ( 'messagebird' ) ( '9JSzfMjLWvJ51W8UErxlVnMpl' ) ;
    /* messagebird.conversations.list(20, 0, function (err, response) {
        if (err) {
        return console.log(err);
        }
        res.status(200).send(response);
      }); */
      const conversationId = '961c2aa746a34ce98998952180c60cae';

messagebird.conversations.listMessages(conversationId, function (err, response) {
  if (err) {
  return console.log(err);
  }
  res.status(200).send(response);
});
      
}


const verificar_token = async function(req,res){
    if(req.user){
        
        res.status(200).send({data:true});
    }else{
        res.status(403).send({data:false});
    }
}

module.exports = {
    prueba_test,
    verificar_token,
    get_conversations
}