<template>
  <v-app>
    <v-dialog v-model="logoutIsOpen" persistent max-width="500px">
      <v-card>
        <v-card-title class="header">
          <p class="mb-0 py-3">Bạn có chắc muốn đăng xuất ?</p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancel" class="cancel"> Hủy </v-btn>
          <v-btn text @click="signOut" class="yes ml-2"> Đăng xuất </v-btn>
        </v-card-actions>
        <!-- <div class="sign-out">
        <div class="header">Do you really want to Sign out?</div>
        <div class="buttons">
          <div class="cancel" @click="cancel">Cancel</div>
          <div class="yes" @click="signOut">Yes</div>
        </div>
      </div> -->
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState({
      logoutIsOpen: (state) => state.logoutIsOpen,
    }),
  },
  methods: {
    signOut() {
      localStorage.removeItem("auth._token.local");
      this.$store.commit("SET_LOGOUT_USER");
      this.$router.push("/login");
      this.$store.commit("CONFIRM_LOGOUT", false);
    },
    cancel() {
      this.$store.commit("CONFIRM_LOGOUT", false);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
.header {
  text-align: center !important;
  font-weight: bold !important;
  font-size: 16px !important;
  line-height: 37px !important;
  letter-spacing: -0.114286px !important;
  color: $primaryBlack !important;
}
.cancel {
  border: 2px solid #0052a2 !important;
  border-radius: 12px !important;
  padding: 0 8px !important;
  font-weight: bold !important;
  font-size: 14px !important;
  line-height: 21px !important;
  height: 36px !important;
  width: 126px !important;
  text-align: center !important;
  letter-spacing: -0.0642857px !important;
  color: #0052a2 !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
}
.yes {
  border: 1px solid #0052a2 !important;
  padding: 0 8px !important;
  height: 36px !important;
  width: 126px !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  background: #0052a2 !important;
  mix-blend-mode: normal !important;
  opacity: 0.9 !important;
  border-radius: 12px !important;
  font-weight: bold !important;
  font-size: 14px !important;
  line-height: 21px !important;
  text-align: center !important;
  letter-spacing: -0.0642857px !important;
  color: $primaryWhite !important;
}
</style>
