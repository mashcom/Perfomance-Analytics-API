import Application from "@ioc:Adonis/Core/Application";
import Video from "App/Models/Video";

export default class OutcomesController {

  async show({ params, response }) {
    const videos = await Video.query().where("id",params.id)
    return response.status(200).send(videos);
  }

  public async store({ request, response }) {
    const videoFile = request.file("file", {
      size: "100mb",
      extnames: ["mkv", "mp4"]
    });
    if (!videoFile) {
      return response.status(500).send({ message: "File missing", code: "FILE_MISSING" });
    }

    if (!videoFile.isValid) {
      return response.status(500).send({ message: "File missing", code: "INVALID_FILE" });

    }
    if (videoFile) {

      const video = new Video();
      video.name = videoFile.clientName;
      console.log(videoFile)
      video.id = request.body().id;

      if (await video.save()) {
        await videoFile.move(Application.publicPath("uploads"));
        return response.status(200).send({ message: "Video added successfully" });
      }
      return response.status(400).send({ message: "Video could not be added" });

    }
  }

}
