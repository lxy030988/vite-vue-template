export default {
  user: {
    login: 'user/login'
  },
  file: {
    upload: 'upload/upload'
  },
  authorizationManagement: {
    list: 'license-record/queryAuthorizationList',
    add: 'license-record/addAuthorization',
    update: 'license-record/updateAuthorization',
    deviceList: 'license-record-equipment/queryEquipmentList',
    addDevice: 'license-record-equipment/insertEquipment',
    updateDeviceStatus: 'license-record-equipment/updateEquipmentStatus',
    importDevice: 'license-record-equipment/importLicense'
  }
}
