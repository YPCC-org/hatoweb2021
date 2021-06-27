<template>
    <table style="table-layout: fixed; text-align: center;" class="schedule-table">
        <th width=50></th>
        <th v-for="i in 12" :key="i">
        </th>
        <tr>
            <td>9:00</td>
            <td></td>
            <td colspan=11 rowspan=2>
                <v-card outlined>
                    <p>8:40~</p>
                    <p>クラス・係準備</p>
                    <p>前夜祭クラスリハ</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>10:00</td>
        </tr>
        <tr>
            <td>11:00</td>
        </tr>
        <tr>
            <td>12:00</td>
        </tr>
        <tr>
            <td>13:00</td>
        </tr>
        <tr>
            <td>14:00</td>
        </tr>
        <tr>
            <td>15:00</td>
        </tr>
        <tr>
            <td>16:00</td>
        </tr>
        <tr>
            <td>17:00</td>
        </tr>
        <tr>
            <td>18:00</td>
        </tr>
        <tr>
            <td>19:00</td>
        </tr>
        <tr>
            <td>20:00</td>
        </tr>
    </table>
</template>

<style>
    .schedule-table > tr {
        height: 50px;
    }
</style>

<script>
export default {
    name: 'Sun',
}
</script>
