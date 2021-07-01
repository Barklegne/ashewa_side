import Vue from "vue";
import ErrorMessage from "@/components/common/ErrorMessage.vue";
import SuccessMessage from "@/components/common/SuccessMessage.vue";
import SubmitButton from "@/components/common/SubmitButton.vue";
// import Countdown from "@/components/common/Countdown.vue";
// import VueCountdown from "@chenfengyuan/vue-countdown";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

Vue.component("ErrorMessage", ErrorMessage);
Vue.component("SuccessMessage", SuccessMessage);
Vue.component("SubmitButton", SubmitButton);
Vue.component("VuePhoneNumberInput", VuePhoneNumberInput);
// Vue.component(`vue-${VueCountdown.name}`, VueCountdown);
// Vue.component(`Countdown`, Countdown);
