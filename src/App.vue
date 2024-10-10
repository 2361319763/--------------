<script setup>
import { ref, reactive, toRefs } from "vue";
import { getDwmcList, getRsDetail } from "@/api/base";

const loading = ref(false);
const tableLoading = ref(false);
const tableData = ref([]);
const proxyTableData = ref([]);
const options = ref([]);
const data = reactive({
  form: {
    q: "",
    yjfxmc: "",
  },
});

const { form } = toRefs(data);

const remoteMethod = (query) => {
  if (query) {
    loading.value = true
    getDwmcList({
      q: query,
      _t: Date.now(),
    }).then((res) => {
      loading.value = false
      options.value = res
    })
  } else {
    options.value = []
  }
}

const handleAdmissionsUnitChange = async (val) => {
  tableLoading.value = true;
  try {
    const allData = await fetchAllData({
      zydm: 105111,
      zymc: '外科学',
      dwdm: val.dwdm,
      dwlxs: ['all'],
    });
    tableData.value = allData;
    if (form.value.yjfxmc) {
      proxyTableData.value = tableData.value.filter((item) => item.yjfxmc.includes(form.value.yjfxmc));
    } else {
      proxyTableData.value = tableData.value;
    }
  } catch (err) {
    console.error("Error fetching RsDetail:", err);
  } finally {
    tableLoading.value = false;
  }
}

const fetchAllData = async (params) => {
  let allData = [];
  let page = 0;
  const pageSize = 10;
  let total = 0;

  do {
    const response = await getRsDetail({
      ...params,
      start: page * pageSize,
      pageSize,
    });

    if (response.msg && response.msg.list) {
      allData = [...allData, ...response.msg.list];
      total = response.msg.totalCount;
      page++;
    } else {
      break;
    }
  } while (allData.length < total);

  return allData;
};

const handleYjfxmcChange = (val) => {
  if (val) {
    proxyTableData.value = tableData.value.filter((item) => item.yjfxmc.includes(val));
  } else {
    proxyTableData.value = tableData.value;
  }
};

const getKskmz = (val) => {
  return val.map(item => Object.keys(item).map(key => `(${item[key].kskmdm})${item[key].kskmmc}`))
}
</script>

<template>
  <div class="main">
    <el-form :model="form" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="">
            <el-select
              v-model="form.q"
              filterable
              remote
              reserve-keyword
              remote-show-suffix
              placeholder="开设招生单位"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in options"
                :key="item.dwdm"
                :label="`(${item.dwdm})${item.dwmc}`"
                :value="item.dwmc"
                @click="handleAdmissionsUnitChange(item)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="">
            <el-input v-model="form.yjfxmc" placeholder="研究方向" @change="handleYjfxmcChange" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    
    <el-table :data="proxyTableData" border stripe style="position: relative" v-loading="tableLoading">
      <el-table-column prop="yxsmc" label="院系所">
        <template #default="{row}">
          <span>({{ row.yxsdm }}){{ row.yxsmc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ksfsmc" label="考试方式" width="60" />
      <el-table-column prop="zymc" label="专业">
        <template #default="{row}">
          <span>({{ row.zydm }}){{ row.zymc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="xxfs" label="学习方式">
        <template #default="{row}">
          <span>{{ row.xxfs === '1' ? '全日制' : '非全日制' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="yjfxmc" label="研究方向">
        <template #default="{row}">
          <span>({{ row.yjfxdm }}){{ row.yjfxmc }}</span> 
        </template>
      </el-table-column>
      <el-table-column prop="nzsrsstr" label="拟招生人数" />
      <el-table-column prop="kskmz" label="考试科目">
        <template #default="{row}">
          <div v-for="(item) in getKskmz(row.kskmz)" :key="item" class="kskmz">
            <el-tag v-for="i in item" :key="i">{{ i }}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="css" scoped>
.main {
  position: relative;
}
</style>