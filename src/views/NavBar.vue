<!-- eslint-disable max-len -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top py-lg-0 bg-dark shadow">
    <div class="container">
      <div class="btn-group d-block">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-bar">
          <vue-feather type="menu"></vue-feather>
        </button>
      </div>
      <router-link to="/" class="navbar-brand">
        HealthApp
        <vue-feather type="heart" animation="pulse"></vue-feather>
      </router-link>
      <div class="collapse navbar-collapse" data-bs-parent="body" id="nav-bar">
        <ul class="navbar-nav mx-auto mb-2 mb-sm-0 mt-md-1" style="overflow: auto;">
          <li class="nav-link">
            <router-link to="/tutorials" class="nav-link">
              <vue-feather type="grid" animation="spin" class="d-lg-block mx-auto"></vue-feather>
              Dashboard
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/add" class="nav-link">
              <vue-feather type="crosshair" animation="spin" class="d-lg-block mx-auto"></vue-feather>
              Goals
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/measurements" class="nav-link">
              <vue-feather type="eye" animation="spin" class="d-lg-block mx-auto"></vue-feather>
              Measurements
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/calories" class="nav-link">
              <vue-feather type="sun" animation="spin" class="d-lg-block mx-auto"></vue-feather>
              Calories
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/activities" class="nav-link">
              <vue-feather type="zap" animation="spin" class="d-lg-block mx-auto"></vue-feather>
              Activities
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-sm-0 mt-md-1" style="overflow: auto;">
          <li>
            <router-link to="/settings" class="nav-link text-secondary">
              <vue-feather type="settings" animation="spin"></vue-feather>
              Settings
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  
<script>
export default {
  name: "nav-bar"
};
</script>
  
<style scoped>
.nav-link.router-link-active {
  color: var(--bs-primary) !important;
}

.nav-link>i {
  margin-right: 4px;
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
}

.nav-link>a {
  padding: 0;
}

.navbar-brand:not(:hover)>i,
.nav-link:not(:hover):not(.router-link-active)>i {
  animation: none;
}
</style>