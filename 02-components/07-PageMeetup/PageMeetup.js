import {defineComponent} from './vendor/vue.esm-browser.js';
import {fetchMeetupById} from './meetupService.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      message: null,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(newMeetupId) {
        this.message = 'Загрузка...';
        fetchMeetupById(newMeetupId)
          .then((meetup) => {
            this.message = null;
            this.meetup = meetup;
          })
          .catch((err) => {
            this.message = err.message;
          });
      },
    },
  },

  template: `
    <div class="page-meetup">
      <ui-container v-if="message">
        <ui-alert>{{ message }}</ui-alert>
      </ui-container>
      <meetup-view v-else-if="meetup" :meetup="meetup"></meetup-view>
    </div>`,
});
