<!-- eslint-disable max-len -->
<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(tutorial, index) in tutorials"
          :key="index" @click="setActiveTutorial(tutorial, index)">
          {{ tutorial.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <tutorial-item :tutorial="currentTutorial" @refreshList="refreshList" />
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import Tutorial from "../models/Tutorial";
import TutorialItem from "./TutorialItem";

export default {
  name: "tutorials-list",
  components: { TutorialItem },
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      unsubscribe: null
    };
  },
  methods: {
    onDataChange(items) {
      let _tutorials = [];

      items.forEach((item) => {
        let id = item.id;
        let data = item.data();
        _tutorials.push({
          id: id,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });

      this.tutorials = _tutorials;
    },

    refreshList() {
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.unsubscribe = Tutorial
      .getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  },
  beforeUnmount() {
    this.unsubscribe();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
