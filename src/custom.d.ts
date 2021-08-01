declare global {
  type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number
    createAt?: string
  }
  type Tag = {
    id: string
    name: string
  }
  type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => string
    update: (id: string, name: string) => string
    save: () => void
    remove: (id: string) => boolean
  }
  type RootState = {
    recordList: RecordItem[],
    tagList: Tag[]
    currentTag?: Tag
  }
}
export {};