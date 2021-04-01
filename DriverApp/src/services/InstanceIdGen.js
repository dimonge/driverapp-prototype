import instanceId from '@react-native-firebase/iid';

function InstanceId() {}

InstanceId.prototype.getInstanceId = async function() {
  const id = await instanceId().get();
  console.log('Current Instance id: ', id);
  return id;
};

export default new InstanceId();
