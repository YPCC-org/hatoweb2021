<template>
    <table style="table-layout: fixed; text-align: center;" class="schedule-table">
        <th width=50></th>
        <th v-for="i in 12" :key="i">
        </th>
        <tr>
            <td>9:00</td>
            <td colspan=12 rowspan=1 class="pt-3 pl-5">
                <v-card outlined>
                    <p>8:30~ SHR・清掃・準備</p>
                </v-card>
                <v-card outlined class="mt-3">
                    <p>9:30~</p>
                    <p>学級展・模擬店・喫茶・ハトヤ 開始</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>10:00</td>
            <td colspan=4 rowspan=6 class="pt-3 pl-5">
                <v-card outlined height="300">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <p>学芸班発表</p>
                    <p>(２体)</p>
                </v-card>
            </td>
            <td colspan=4 rowspan=6 class="pt-3 pl-5">
                <v-card outlined height="300">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <p>中庭</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>11:00</td>
            <td colspan=4 rowspan=2 class="pt-3 pl-5">
                <v-card outlined>
                    <p>10:30~</p>
                    <p>月見亭</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>12:00</td>
        </tr>
        <tr>
            <td>13:00</td>
            <td colspan=4 rowspan=2 class="pt-3 pl-5">
                <v-card outlined>
                    <p>12:30~</p>
                    <p>理数科展</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>14:00</td>
        </tr>
        <tr>
            <td>15:00</td>
        </tr>
        <tr>
            <td>16:00</td>
            <td colspan=12 rowspan=1 class="pt-3 pl-5">
                <v-card outlined>
                    <p>15:30~ 片付け</p>
                </v-card>
            </td>
        </tr>
        <tr>
            <td>17:00</td>
            <td colspan=12 rowspan=2 class="pt-3 pl-5">
                <v-card outlined>
                    <p>16:30~</p>
                    <p>中夜祭</p>
                    <p>(グラウンド)</p>
                </v-card>
            </td>
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
    name: 'Sad',
}
</script>
