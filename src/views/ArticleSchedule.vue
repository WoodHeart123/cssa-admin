<template>
  <div class="schedule-container">
    <FullCalendar :options="calendarOptions" />
  </div>

</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
export default {
  name: 'articleschedule',
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
      }
    }
  }
}
</script>

<style scoped>

.schedule-container {
  padding: 20px;
  margin: 20px;
  width: 1100px;
  height: calc(100% - 40px);
  border-radius: 10px;
  background: #fff;
  
}

</style>
