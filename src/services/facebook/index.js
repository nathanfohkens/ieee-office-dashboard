import moment from 'moment';
import { facebook } from '../../config';

const postLimit = 10;
const postFields = 'id,message,story, caption,description,name, full_picture';
export default {
  getData: () => fetch(`https://graph.facebook.com/oauth/access_token?client_id=${facebook.client}&client_secret=${facebook.secret}&grant_type=client_credentials`)
    .then(response => response.ok && response.json(), (error) => { console.error(error); return { status: 500, error }; })
    .then((accessResp) => {
      this.access_token = accessResp.access_token;
      return fetch(`https://graph.facebook.com/v2.9/ieeecarleton/feed?access_token=${accessResp.access_token}&limit=${postLimit}`);
    })
    .then(response => response.ok && response.json(), (error) => { console.error(error); return { status: 500, error }; })
    .then(({ data }) => Promise.all(data.map(post => fetch(`https://graph.facebook.com/v2.9/${post.id}?access_token=${this.access_token}&fields=${postFields}`)
      .then((response) => { if (!response.ok) { throw new Error(response.statusText); } return response.json(); })
      .catch((error) => { console.error(error); return error; })))),
  transformResponse: (responses) => {
    console.log(responses);
    return responses[0].id ?
      responses.map(({
        id, story, name, message, full_picture,
      }) => ({
        type: 'facebook', id, story, name, message, src: full_picture,
      })) :
      { status: responses[0].error.code, msg: responses[0].error.message };
  },
};