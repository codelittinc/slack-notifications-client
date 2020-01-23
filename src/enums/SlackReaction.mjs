class SlackReaction {
  static rotating_light = new SlackReaction('rotating_light');
  static white_check_mark = new SlackReaction('white_check_mark');
  static hourglass = new SlackReaction('hourglass');
  static merge = new SlackReaction('merge2')
  static warning = new SlackReaction('warning')
  static speech_balloon = new SlackReaction('speech_balloon')
  static pencil = new SlackReaction('pencil2')

  constructor(name) {
    this.name = name;
  }

  simple() {
    return this.name;
  }

  forMessage() {
    return `:${this.name}:`
  }

  static listSimple() {
    return [
      this.rotating_light.simple(),
      this.white_check_mark.simple(),
      this.hourglass.simple(),
      this.merge.simple(),
      this.warning,
      this.speech_balloon,
      this.pencil
    ]
  }

  static listSimpleRemoving(reactionToRemove) {
    return this.listSimple().filter(r => r !== reactionToRemove);
  }
}

export default SlackReaction;