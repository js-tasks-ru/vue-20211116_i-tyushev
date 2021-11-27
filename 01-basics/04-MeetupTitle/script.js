import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const MeetupTitle = defineComponent({
  name: 'MeetupTitle',

  data() {
    return {
      currentId: 1,
      meetupTitle: '',
    };
  },

  watch: {
    currentId: {
      immediate: true,
      handler(id) {
        fetchMeetupById(id).then((meetupData) => {
          this.meetupTitle = meetupData.title;
        });
      },
    },
  },
});

const app = createApp(MeetupTitle);

const vm = app.mount('#app');
