<template>
  <v-layout v-if="editRights" justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            v-model.trim="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="名前"
            :placeholder="name"
            required
            disabled
            outline
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-btn depressed color="error" @click.stop="dialog = true">ユーザー情報を全て削除</v-btn>

      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title>本当に削除しますか？</v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" flat="flat" @click="deleteCurrentUser">はい</v-btn>

            <v-btn color="green darken-1" flat="flat" @click="dialog = false">いいえ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import { checkEditRights } from "@/lib/api-service";
import { deleteCurrentUser } from "@/lib/api-service";
import firebase from "@/lib/firebase";

export default {
  data() {
    return {
      dialog: false,
      editRights: true,
      name: "皆川ヒロキ"
    };
  },
  methods: {
    checkEditRights: async function() {
      const { userId } = this.$route.params;
      this.editRights = await checkEditRights(userId);
      if (!this.editRights) {
        this.$router.push({ name: "Home" });
        this.$emit("makeAlert", "編集権限がありません。");
      }
    },
    deleteCurrentUser: async function() {
      this.dialog = false;
      const { message } = await deleteCurrentUser();
      const firebaseUserInfo = firebase.auth().currentUser;
      await firebaseUserInfo.delete();
      this.$router.push({ name: "Home" });
      this.$emit("makeAlert", message);
    }
  },
  created() {
    this.checkEditRights();
  },
  watch: {
    $route() {
      this.checkEditRights();
    }
  }
};
</script>