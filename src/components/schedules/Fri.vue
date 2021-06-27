<template>
    <table style="table-layout: fixed; text-align: center;" class="schedule-table">
        <th width=50></th>
        <th v-for="i in 12" :key="i">
        </th>
        <tr>
            <td>9:00</td>
            <td colspan=12 rowspan=2 class="pt-3 pl-5">
                <v-card outlined>
                    <p>8:40 ~</p>
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
            <td colspan=12 rowspan=1 class="pt-3 pl-5">
                <v-card outlined>
                    <p>11:00 ~</p>
                    <p>清掃・昼食</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>12:00</td>
            <td colspan=6 rowspan=2 class="pt-3 pl-5">
                <v-card outlined>
                    <p>12:00 ~</p>
                    <p>ハト1GP</p>
                    <p>(グラウンド)</p>
                </v-card>
            </td>
            <td colspan=6 rowspan=2 class="pt-3 pl-5">
                <v-card outlined>
                    <p>12:00 ~</p>
                    <p>全校企画</p>
                    <p>(校舎内)</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>13:00</td>
        </tr>
        <tr>
            <td>14:00</td>
            <td colspan=12 rowspan=5 class="pt-3 pl-5">
                <v-card outlined style="height: 250px;">
                    <p>14:30 ~</p>
                    <br>
                    <p>開催式</p>
                    <p>前夜祭</p>
                    <p>(グラウンド)</p>
                </v-card>
            </td>
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
    name: 'Fri',
}
</script>
