<template>
  <div id="main-left">
    <router-link to="/add-new" v-if="$store.state.isLoggedIn" id="add-new"
      >Yeni Ekle</router-link
    >
    <router-link
      v-for="entry in allEntries"
      :key="entry.key"
      :to="{
        name: 'Post',
        params: { slug: entry.slug, title: entry.title },
      }"
      class="entry"
    >
      <span>{{ entry.title }}</span>
      <span class="comment-count" v-if="entry.commentCount > 0">{{
        entry.commentCount
      }}</span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
#add-new {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  background-color: #ff9469;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
  transition: 300ms all ease;

  &:hover {
    background-color: darken(#ff9469, 5);
  }
}
.entry {
  width: 100%;
  font-size: 10px;
  text-decoration: none;
  color: #091921;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  &:hover {
    color: #ff9469;
  }

  .comment-count {
    margin-left: 10px;
    padding: 5px;
    background-color: #eee;
    font-size: 8px;
  }
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['allEntries'])
  },
  created() {
    this.$store.dispatch('fetchAllEntries');
  }
}
</script>