import { Audio } from 'expo-av';

export default class SoundController {
    public music: unknown = null
    static instance = SoundController.instance ?? new SoundController()

    public async playClick () {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sounds/click.mp3')
        );
        await sound.playAsync(); }

    public async  playReaction(reaction: string) {
        if( reaction === 'victory'){
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/sounds/victory.mp3')
            );
            await sound.playAsync(); }
        if( reaction === 'losing'){
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/sounds/losing.mp3')
            );
            await sound.playAsync(); }
        if( reaction === 'gameOver'){
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/sounds/gameOver.mp3')
            );
            await sound.playAsync(); }
        if( reaction === 'startGame'){
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/sounds/game.mp3')
            );
            this.music = sound
            await this.music.playAsync(); }
        if( reaction === 'stopGame'){

            await this.music.stopAsync(); }
    }
}




