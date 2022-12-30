<script lang="ts">
  import ArrowIcon from '@/icons/arrow-icon.svelte'
  import DoubleArrowIcon from '@/icons/double-arrow-icon.svelte'
  import * as fns from 'date-fns'
  import { days, generateMonthView } from './calendar-data'
  let value = new Date()
  $: monthView = generateMonthView(value)

  // TODO: calendarとtoolbarのfocus移動

  const closeCalendar = () => {
    console.log('TODO: close calendar')
  }

  const selectDate = (date: Date) => {
    value = date
  }

  const goToPrevMonth = () => {
    const prevMonth = fns.subMonths(value, 1)
    value = fns.startOfMonth(prevMonth)
  }

  const goToNextMonth = () => {
    const nextMonth = fns.addMonths(value, 1)
    value = fns.startOfMonth(nextMonth)
  }

  const goToPrevYear = () => {
    const prevYear = fns.subYears(value, 1)
    value = fns.startOfMonth(prevYear)
  }

  const goToNextYear = () => {
    const nextYear = fns.addYears(value, 1)
    value = fns.startOfYear(nextYear)
  }

  const setPrevDate = () => {
    value = fns.subDays(value, 1)
  }

  const setNextDate = () => {
    value = fns.addDays(value, 1)
  }

  const setDatePrevWeek = () => {
    value = fns.subWeeks(value, 1)
  }

  const setDateNextWeek = () => {
    value = fns.addWeeks(value, 1)
  }

  const setDatePrevMonth = () => {
    value = fns.subMonths(value, 1)
  }

  const setDateNextMonth = () => {
    value = fns.addMonths(value, 1)
  }

  const setDatePrevYear = () => {
    value = fns.subYears(value, 1)
  }

  const setDateNextYear = () => {
    value = fns.addYears(value, 1)
  }

  const setMonthStartDate = () => {
    value = fns.startOfMonth(value)
  }

  const setMonthEndDate = () => {
    value = fns.endOfMonth(value)
  }

  const onKeydownCalendarDate = (e: KeyboardEvent) => {
    const key = e.key
    const withShift = e.shiftKey
    switch (key) {
      case 'Esc':
      case 'Escape':
        closeCalendar()
        break
      case 'PageUp':
        withShift ? setDatePrevYear() : setDatePrevMonth()
        break
      case 'PageDown':
        withShift ? setDateNextYear() : setDateNextMonth()
        break
      case 'End':
        setMonthEndDate()
        break
      case 'Home':
        setMonthStartDate()
        break
      case 'Left':
      case 'ArrowLeft':
        setPrevDate()
        break
      case 'Right':
      case 'ArrowRight':
        setNextDate()
        break
      case 'Up':
      case 'ArrowUp':
        setDatePrevWeek()
        break
      case 'Down':
      case 'ArrowDown':
        setDateNextWeek()
        break
      default:
        return
    }
    e.preventDefault()
    e.stopPropagation()
  }
</script>

<div>selected: {fns.format(value, 'yyyy/MM/dd')}</div>
<div class="calendar">
  <div role="toolbar" aria-label="flip through calendar" aria-controls="calendar-table">
    <button type="button" aria-label="previous year" on:click={goToPrevYear}>
      <DoubleArrowIcon dir="left" />
    </button>
    <button type="button" aria-label="previous month" on:click={goToPrevMonth}>
      <ArrowIcon dir="left" />
    </button>
    <div id="selected-month">
      {fns.format(value, 'MMMM yyyy')}
    </div>
    <button type="button" aria-label="next month" on:click={goToNextMonth}>
      <ArrowIcon dir="right" />
    </button>
    <button type="button" aria-label="next year" on:click={goToNextYear}>
      <DoubleArrowIcon dir="right" />
    </button>
  </div>
  <table role="grid" aria-labelledby="selected-month" id="calendar-table">
    <thead>
      <tr>
        {#each days as { full, abbr }}
          <th role="columnheader">
            <abbr title={full}>{abbr}</abbr>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each monthView as week, i}
        <tr>
          {#each week as date, j}
            {#if date}
              <td role="gridcell">
                <button
                  type="button"
                  on:click={() => date && selectDate(date)}
                  on:keydown={onKeydownCalendarDate}
                >
                  {fns.getDate(date)}
                </button>
              </td>
            {:else}
              <td />
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
