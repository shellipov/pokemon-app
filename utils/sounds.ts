import {Audio, AVPlaybackSource} from 'expo-av';

export enum ReactionEnum {
    victory= 'victory',
    losing= 'losing',
    gameOver= 'gameOver',
    startGame= 'startGame',
    stopGame= 'stopGame',
}

const soundBank : { [key in ReactionEnum]?: AVPlaybackSource} = {
  [ReactionEnum.victory]: require('../assets/sounds/correctly.mp3'),
  [ReactionEnum.losing]: require('../assets/sounds/wrong.mp3'),
  [ReactionEnum.gameOver]: require('../assets/sounds/gameOver.mp3'),
  [ReactionEnum.startGame]: require('../assets/sounds/game.mp3'),
};

export class SoundController {
  // @ts-ignore
  static instance = SoundController.instance ?? new SoundController();
  public music:  Audio.Sound | undefined  = undefined;

  public async setIOSSettings () {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
    }); }

  public async playClick () {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/click.mp3')
    );
    await sound.playAsync(); }


  public async  playReaction (reaction: ReactionEnum) {
    const path = soundBank[reaction];

    if (reaction !== ReactionEnum.stopGame && !!path) {
      const { sound } = await Audio.Sound.createAsync(path);
      this.music = sound;
      await this.music?.playAsync();
    }

    if (reaction === ReactionEnum.stopGame && !!this.music) {
      await this.music?.stopAsync();
    }
  }
}




