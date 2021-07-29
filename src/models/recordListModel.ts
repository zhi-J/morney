import clone from '@/lib/clone';


const localStorageKeyName = 'recordLit'
const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem){
    const record2: RecordItem = clone(record);
    record2.createAt = new Date();
    this.data.push(record2);
    this.save()
  },
  fetch(){
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
    return this.data
  } ,
  save(){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
}
export default recordListModel;