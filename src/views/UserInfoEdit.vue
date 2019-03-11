<template>
<v-layout justify-center>
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
    </v-flex>
    <h1>ユーザー情報削除</h1>
  </v-layout>
</template>

<script>
export default {
	data() {
		return {
			name: "皆川ヒロキ"
		}
	}
    
}
</script>