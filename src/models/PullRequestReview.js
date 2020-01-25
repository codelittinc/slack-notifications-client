import mongodb from 'mongodb';
import Database from '@services/Database'

import { BaseModel } from '@models';

const collectionName = 'pullRequestsReviews';

class PullRequestReview extends BaseModel {
  async create() {
    const collection = await Database.getCollection(collectionName);

    const commit = await collection.insertOne({
      createdAt: Date.now(),
      prId: this.prId,
      state: this.state,
      username: this.username
    });

    this.id = commit.ops[0]._id

    return this;
  };

  async update() {
    const collection = await Database.getCollection(collectionName);
    const json = {
      state: this.state,
      updatedAt: Date.now()
    };

    const objectID = new mongodb.ObjectID(this.id)
    return await collection.updateOne({ _id: objectID }, { $set: json })
  };

  async createOrLoadByUsernameAndPR() {
    const pullRequestReview = await PullRequestReview.findBy({ prId: this.prId, username: this.username });

    if (pullRequestReview) {
      pullRequestReview.state = this.state;
      await pullRequestReview.update();
      return pullRequestReview;
    }

    return await this.create()
  }

  static async findByPRId(prId) {
    return this.list({ prId });
  }

  static async findBy(query) {
    const collection = await Database.getCollection(collectionName);

    const response = await collection.findOne(query);

    if (!response) {
      return null;
    }

    return new PullRequestReview({ ...response, id: response._id })
  };

  static async list(query) {
    const collection = await Database.getCollection(collectionName);

    const response = await collection.find(query);

    const array = await response.toArray()

    return array.map(doc => new PullRequestReview({...doc, id: doc._id }))
  };
};

export default PullRequestReview;