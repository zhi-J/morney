import clone from '@/lib/clone';

const localStorageKeyName = 'recordLit'
const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords(){
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
    return this.recordList
  },
  saveRecords(){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  //record store
  createRecord(record: RecordItem){
    const record2: RecordItem = clone(record);
    record2.createAt = new Date();
    this.recordList?.push(record2);   //可选链，新语法
    recordStore.saveRecords()
  },
}
recordStore.fetchRecords()

export default recordStore