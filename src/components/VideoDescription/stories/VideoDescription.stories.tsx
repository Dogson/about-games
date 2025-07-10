import VideoDescription, {
  type VideoDescriptionProps,
} from "../VideoDescription.component.tsx";
import type { Meta, StoryFn } from "@storybook/react-vite";

export default {
  title: "Components/VideoDescription",
  component: VideoDescription,
  argTypes: {
    description: { control: "text" },
  },
} as Meta<typeof VideoDescription>;

const Template: StoryFn<VideoDescriptionProps> = (args) => (
  <VideoDescription
    {...args}
    onTimestampClick={(timestamp) => alert(`Clicked on timestamp ${timestamp}`)}
  />
);

export const ShortDescription = Template.bind({});
ShortDescription.args = {
  description: "An emotional analysis of a quiet game.",
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  description:
    "Suite et fin de la critique de Lost Records Bloom & Rage Tape 2 : Rage et le tour d'horizon des sorties avec Cthuloot, Haste et Swandwalkers. Tout ça ficelé avec du Mario Kart World, des recos et de la bonne humeur... c'est l'Hebdo !\n\n📼 Playlist de l'émission : https://www.youtube.com/playlist?list=PLZRiqJjIUlDRkiqFdbUir7_PLjbQByyuj\n🙏 Soutenez Origami, nouveau média indépendant : https://patreon.com/origamimedia\n\n+ d'ORIGAMI : \nhttps://youtu.be/vAvBOFD4Xp0\nhttps://youtu.be/41ZeYXlAuXk\nhttps://youtu.be/FQ8sRtVGrGI\n\nChapitrage\n00:00 Sommaire\n6:47 L'actu JV en presque cinq minutes\n13:12 Mario Kart World Direct\n32:27 On y a joué - CTHULOOT\n43:42 On y a joué - Haste : Broken Worlds\n1:02:56 On y a joué - Sandwalkers \n1:23:31 Critique - Lost Records Bloom & Rage Tape 2 - Rage\n1:47:33 Mais pas que, nos recos culturelles de la semaine\n1:50:51 Merci à la semaine prochaine !\n\n✔️ Un like, ça fait plaisir, un abonnement ça fait super-plaisir :  https://bit.ly/origamiyoutube (si tu actives la cloche tu es quelqu'un de bien)\n\n🖥️ Des achats matos à faire ? Utilisez le code créateur ORIGAMI sur votre espace client TopAchat pour soutenir la rédaction https://secure.topachat.com/AffiliationCreator\n\n🪁 Chroniqueurs : https://bsky.app/profile/hlinossier.bsky.social, https://bsky.app/profile/gautoz.cool, https://bsky.app/profile/elmogurito.bsky.social, https://bsky.app/profile/leperefidalbion.bsky.social, https://bsky.app/profile/hoopyjv.bsky.social\n\n🔴 Retrouvez L'Hebdo ORIGAMI tous les vendredi à 13h00 sur https://twitch.tv/origatwitch !\n\n🎧 L'Hebdo est également disponible en podcast !\n► RSS : https://shows.acast.com/origami-l-hebdo\n► Spotify : https://open.spotify.com/show/4UCVwBVLeVJIzFEeyikHFu\n► Apple Podcasts : https://podcasts.apple.com/us/podcast/origami-lhebdo/id1713537131\n► Deezer https://www.deezer.com/fr/show/1000812341\n\nNos réseaux sociaux :\n► Twitter :  https://twitter.com/origatwi\n► Instagram :  https://instagram.com/origagram\n► TikTok :  https://tiktok.com/@origatik\n► BlueSky : https://bsky.app/profile/origasky.bsky.social\n\nCrédits :\nVignette : https://youtube.com/@MidiMusic\nMusique : https://twitter.com/monthaye\nDA : https://twitter.com/MVCDLM\n\n#origami  #origamimedia #MarioKartWorld",
};
