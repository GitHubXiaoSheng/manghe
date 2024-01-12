<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    var inviter = this.$router.id;
    post("api/userCard/InviteUser", { inviter: inviter }).then(res => {
        
    });
    this.$route.push("home");
  }
};
</script>