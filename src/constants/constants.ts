export const dataMenuUser = [
  {
    title_vi: 'Folder1',
    icon: 'FOLDER',
    children: {
      title_vi: 'Folder1',
      icon: 'FOLDER',
      data: [
        {
          title_vi: 'Folder child1',
          icon: 'FOLDER',
          children: {
            title_vi: 'Folder1/Folder child1',
            icon: 'FOLDER',
            data: [
              {
                title_vi: 'file1'
              },
              {
                title_vi: 'file2'
              },
              {
                title_vi: 'file3'
              },
              {
                title_vi: 'file4'
              }
            ]
          }
        },
        {
          title_vi: 'Folder child2',
          icon: 'FOLDER'
        },
        {
          title_vi: 'Folder child3',
          icon: 'FOLDER'
        },
        {
          title_vi: 'Folder child4',
          icon: 'FOLDER'
        }
      ]
    }
  },
  {
    title_vi: 'Folder2',
    icon: 'FOLDER',

    children: {
      title_vi: 'Folder2',
      icon: 'FOLDER',
      data: [
        {
          title_vi: 'Folder child1',
          icon: 'FOLDER'
        },
        {
          title_vi: 'Folder child2',
          icon: 'FOLDER'
        }
      ]
    }
  },

  {
    title_vi: 'Folder3',
    icon: 'FOLDER',
    children: {
      title_vi: 'Folder2',
      icon: 'FOLDER',
      data: [
        {
          title_vi: 'Folder child1',
          icon: 'FOLDER'
        },
        {
          title_vi: 'Folder child2',
          icon: 'FOLDER'
        }
      ]
    }
  },
  {
    title_vi: 'Folder4',
    icon: 'FOLDER'
  },
  {
    title_vi: 'Folder4',
    icon: 'FOLDER'
  },
  {
    title_vi: 'Folder4',
    icon: 'FOLDER'
  },
  {
    title_vi: 'Folder4',
    icon: 'FOLDER'
  }
]

export const titleNavbar = {
  controls: 'Điều khiển',
  settings: 'Cài đặt',
  manage_users: 'Quản lý người dùng',
  maps: 'Định vị',
  manage_cameras: 'Quản lý cameras'
}

export const errorFormFilter: {
  [key: string]: string | null | undefined
} = {
  client_name: 'Client name is required',
  accounts_name: 'Account name is required',
  connect_time: 'Connect time is required',
  to_connect_time: 'Connect time is required',
  data_source_path: 'Path source is required',
  destination_path: 'Path destination is required'
}
