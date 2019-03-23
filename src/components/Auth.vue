<template>
  <div>
    <h3>新規登録 or ログイン</h3>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from "@/lib/firebase";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Auth",
  mounted() {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: () => {
          this.$emit("signInComplete");
          return false;
        }
      },
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>
