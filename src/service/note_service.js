const axios = require('./axios_service');
var config = require('./config');
class NoteService{
    addnotes(value){
        let header = {
            headers: {
              'Authorization' : localStorage.getItem("token")
            }
          };
        let url = config.url + 'notes/addNotes';
        return axios.post(url, value, true , header);
    }
    
    getAllNotes(){
      let header = {
          headers: {
            'Authorization' : localStorage.getItem("token")
          }
        };
      let url = config.url + 'notes/getNotesList';
      return axios.get(url, true , header);
  }
  deletenotes(value){
    let header = {
        headers: {
          'Authorization' : localStorage.getItem("token")
        }
      };
    let url = config.url + 'notes/trashNotes';
    return axios.post(url, value, true , header);
}
updatenotes(value){
  let header = {
      headers: {
        'Authorization' : localStorage.getItem("token")
      }
    };
  let url = config.url + 'notes/updateNotes';
  return axios.post(url, value, true , header);
}
trashNotes(){
  let header = {
      headers: {
        'Authorization' : localStorage.getItem("token")
      }
    };
  let url = config.url + 'notes/getTrashNotesList';
  return axios.get(url, true , header);
}
colorNotes(value){
  let header = {
      headers: {
        'Authorization' : localStorage.getItem("token")
      }
    };
  let url = config.url + 'notes/changesColorNotes';
  return axios.post(url, value, true , header);
}
archiveNotes(value){
  let header = {
      headers: {
        'Authorization' : localStorage.getItem("token")
      }
    };
  let url = config.url + 'notes/archiveNotes';
  return axios.post(url, value, true , header);
}
}

module.exports = new NoteService();