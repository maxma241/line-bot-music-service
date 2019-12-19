import { LineUserProfileModel, LineProfileSchema } from './../../data-accessor/mongo/line-profile';
import { LineServices } from "./line-fetcher"


export const verifyLineTokenSvc = async (token: string, userId: string) => {

  // TODO: DB
  // db.lineProfile.findOne(userId)

  const lineSvc = LineServices(token)

  const ret = await lineSvc.getUserProfileByLineAPI(userId);
  if (ret.data.userId !== userId) {
    throw new Error('line token auth error');
  }

  const lineUserProfile = await LineUserProfileModel.findById(userId)
  if (!lineUserProfile) {
    const today = new Date;
    const newLineUserData: LineProfileSchema = {
      ...ret.data,
      createAt: today,
      updateAt: today,
      token,
    }
    const newLineUser = new LineUserProfileModel({
      id: newLineUserData.userId,
      newLineUserData
    });

    await LineUserProfileModel.create(newLineUser)
  }



  return ret;

}