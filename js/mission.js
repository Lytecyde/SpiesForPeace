import Job from "./job.js";
import Operation from "./operation.js";
import Trail from "./trail.js";

export default class Mission {
    constructor(index) {
      this.cover_job = new Job();
      this.trail = new Trail(index);
      this.operation = new Operation();
    }
}