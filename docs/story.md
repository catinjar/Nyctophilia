# Story

Everything narrative in the game lives in two places: the fifteen localization bundles under
`assets/` hold the words, and the fourteen files in `assets/scripts/` decide when they appear.
Nothing is in the Java. This document reconstructs the plot from both.

## One-line premise

A man whose partner left him goes to stay in the house he inherited from his father, on his
psychologist's advice. The house has catacombs under it, his father's papers in a hidden room,
and a recurring cast that follows him out of his dreams.

## Cast

| Who | Where they appear | What they are |
| --- | --- | --- |
| **You** | Everywhere | Unnamed protagonist. Speaks only in inner monologue and in the psychologist scene |
| **She**, the Girl | Every dream, the club, the ending | The woman who left. She has nyctophilia: her life happened at night |
| **The Tall Man** | Intro dream, the cave well, the second dream, Purgatory, the ending | The recurring figure. In Purgatory he is the director running a rehearsal |
| **The Administrator** | Intro hotel, the second dream's kitchen, Purgatory, the past | The hotel clerk who asks whether you have seen tall people lately |
| **The Old-fashioned man** | Purgatory, the ending | Names Archibald and calls him scum |
| **The father** | His letters and old diary | Went to war, came back changed. Mapped the catacombs. Disappeared |
| **Archibald** | Named only in the papers and by the Old-fashioned man | The father's friend, gave him the books, prayed at night, vanished with the family |
| **The psychologist** | The extended ending | Frames the whole game |
| **The barman** | The club, the past | The only character who helps |

## Level order

```
intro ─→ hday1 ─→ hday2 ─→ hdream1 ─→ hday3 ─→ hcave ─→ hdream2 ─→ hnight1
                                                                      │
        hcredits ←─ hend ←─ hdream3 ←─ hpast ←─ hclub ←─ hday4 ←───────┘
```

Every arrow is a `world.changeLevel(...)` call in a script. `hday3` also has a direct route to
`hdream2` if the player sleeps without going down into the cave.

## Chronology

### Intro — the hotel

Opens inside a dream: a dark corridor, a sound behind you, walls that close in each time you
look. A Tall Man appears at the end of it.

You wake in a hotel room. Take the room key from the table, use it on the door, try the other
three doors in the corridor, all locked. The Administrator at the desk makes small talk and
asks whether you have seen tall people recently. You say nothing. Hand back the key and leave.

This hotel returns twice: in the father's fourth letter, and in `hpast`.

### hday1 — Day one

You arrive at the house. It is far from civilization, exactly as the psychologist suggested.
You are too tired to explore. One task: go to bed. You sleep and see nothing.

### hday2 — Day two

You wake rested and pleased about it. The day is the game's template: wash, take the medicine,
eat, drink something, explore the five areas of the house, write in the diary, sleep.

**Diary note 1** records a normal morning and the intention to try the locked doors.

Sleeping leads to the first dream.

### hdream1 — First dream

A grey, doorway-strung dream space with rooms full of eyes. Three of the father's **letters**
are pinned along the way:

- **Letter 1** — he is coming home from the war; the son was six when he left and is eight now;
  he has met a very interesting person.
- **Letter 2** — asks whether his new friend might come and stay; their research could become
  something meaningful; there are phenomena in the area around the house.
- **Letter 3** — asks forgiveness and hopes they can be a happy family again.

In a further room a lamp holds a **light bulb**. Taking it seals the way back and grants the
game's central item: carrying it swaps you between two overlapping versions of the same
rooms. A **rusty key** waits in the other version, and behind the door it opens:

- **Letter 4** — insomnia in a hotel, a figure outside the window at night that looked exactly
  like him, gone by the time he reached the street.

Then the Girl, for three lines. You know her. You do not remember who she is.

### hday3 — Day three

You wake badly. The routine repeats, but the house has opened up. On the second floor you hear
wind coming through a rotten wall. In a box downstairs you find a **crowbar**. The wall comes
down and behind it is a hidden office: shelves of books on ancient legends and mysticism, a
table with the father's papers, and a box holding a **rusty key** and a **map**.

- **Old book** — catacombs of this kind exist in Europe, Siberia, Africa and the New World.
  Each has one entrance and something like a well in its deepest part. Nobody has measured the
  depth. Researchers reported a knocking sound from the well.
- **Letter 5** — written to Archibald. He has mapped the catacombs, put the descent in the barn
  and hidden it from the family. One route goes deeper than he has dared to follow.
- **Old diary 1** — the family suspects nothing; Archibald's books describe catacombs like the
  ones under the house; researchers think medieval sectarians built them; no exit found.

The key opens the barn. The barn has a ladder down.

### hcave — The catacombs

Sixty-one rooms of hand-built maze. The father's map returns you to the entrance from anywhere.
A locked grate yields to the crowbar. Four more pages are scattered at the ends of long
branches:

- **Old diary 2** (cave 2) — he installed the ladder and the grate, and locks the barn at night
  so the family cannot wander in and get lost.
- **Old diary 3** (cave 16) — he drew the map on squared paper, marked walls as filled squares
  and the entrance in blue, and notes that one room should be very interesting.
- **Old diary 4** (cave 52) — he nearly lost himself; he now draws a pencil line to show where
  he has been, erasing and redrawing it each trip.
- **Old diary 5** (cave 59) — in the last dead end he found a hole in the floor with no bottom
  and sounds coming up. He believes the sounds are biological, and wants Archibald to hear them.

A cat sits in a jar in a side room. You can let it go.

At the deepest dead end is the **well**. You listen. The Tall Man appears and tells you two
things: look back more often and you will see a lot of interesting things, and people are not
what they seem.

You go home exhausted and write **diary note 2**, which is the most direct summary the
protagonist ever gives: the hidden room, the catacombs, the well, the sounds, the tall man who
was already in his dream, and the question of whether any of it was real.

### hdream2 — Purgatory

The nightmare version of the house. Something is bleeding and will not stop, the taps run dry,
the family is missing. The hotel Administrator stands in the kitchen saying that the wind is
blowing, the worms are crawling, the world is full of shit. The Girl is on the balcony. The
pictures on the walls now speak in hatred.

Three more pages complete the father's account:

- **Old diary 6** — Archibald has arrived for a few weeks. At night there is something like
  praying from his bedroom. The wife hears nothing. The wife and son both ignore him.
- **Old diary 7** — they went down together; Archibald heard the well too; they now agree the
  sounds come from a living creature and want to find a way to interact with it.
- **Old diary 8** — Archibald has gone and taken the family with him. He has searched
  everywhere except the basement. He is going there now.

A six-lever mechanism bars the way forward. Solving it opens a door to the Tall Man, who is
angry that you still do not understand, promises something worth seeing, and says: one more
day, and you will know everything.

Then **Purgatory** itself. The Tall Man is a director. The Old-fashioned man, the Administrator
and the Girl are his cast, tired of rehearsing the same scene. The scene they rehearse is the
Administrator's small talk from the intro, the line about tall people. You are supposed to have
a line. You do not have a line. You swear at all of them.

### hnight1 — The night

You wake in the dark. There are sounds. The house has gone wrong: no water, no light, the
pictures unreadable, the washing machine ruined, the mirror not worth looking into. The
television works when nothing else does and shows you yourself. A figure appears in the living
room, and six words arrive one at a time: darkness, breathing, figures, yesterday, already
today, blood.

### hday4 — Day four

You wake with a headache and no memory of the night. Everything in the house is broken beyond
repair, and your reflection is gone from both the mirror and the television.

A key is lying on the bedroom table. It was not there before. It opens the attic. In the attic
is a shape; using it shows an eye; and afterwards you know where you have to go.

**Diary note 3** is the turn: he has spent the whole time running from the thing that bothers
him, and now there is no other way. The car starts.

### hclub — The club

A street, a bar, a barman who says hello and then says they are closing. Outside, the Girl is
waiting. She is not surprised.

### hpast — The past

Fully lit, no darkness effects, the only level in the game that looks like ordinary daylight.
This is the memory the whole game has been circling.

You wake and she is gone. In the corridor there is a note, and the note says not to look for
her. You go out. At the club, the barman says a woman was here, asked not to be mentioned, and
tells you anyway because you look desperate; he shows you a place on a map. You drive. At the
hotel, the Administrator says there have been no visitors recently. One place is left.

### hdream3 — Last dream

The house again, at night, in blue. You do not know how you got here. The route leads down to
the cellar, and the cellar is where the father went.

### hend — The end

You see yourself standing there. Then, one scene at a time:

- The **Old-fashioned man**, who names Archibald and calls him scum, and asks whether it was
  all for that.
- The **Tall Man**, furious that after everything you still do not understand.
- **Purgatory** once more, where the Tall Man says the end is near, they will not meet again,
  and that it was fun; and the Old-fashioned man says how much has happened in so little time.
- **Her.** The longest speech in the game. He has been thinking. If she keeps coming back, is
  there still something between them. He knows one thing: he is an idiot, it is all his fault,
  he has always been weak, and at the most important moment he failed to do what was needed.
  He is sorry. He still loves her. But what does he do now.

Two exits stand open at the end of that speech.

- **Staying with her** is the bad ending. He is stuck inside, wandering the back streets of
  consciousness in the echoes of the past, always searching, always further away, and it gets
  darker.
- **The door** is the good ending. He has had enough; he says goodbye; and on the other side he
  is calm for the first time, not because it went well but because he has decided it can.

Both endings feed into the same **extended ending**.

### The extended ending

A session with the psychologist, which recontextualises everything you have played.

She left one day, with no explanation. She had nyctophilia; her life happened at night, and he
needed to sleep at night, and he does not know how they managed as long as they did. He only
needed to be with her. The psychologist says the past should stay in the past.

Then the father. He was a madman. The mother said he changed when he came back from the war.
The childhood injury in the medical record was his doing. The protagonist lived in that house
from childhood until one time, inherited it, and never goes there.

The psychologist suggests that is exactly where he will get better, far from civilization, and
prescribes medicine.

Which is where the game began. The loop is the point.

### hcredits

Nine still frames over a single track, ending on one entity named `infinite` that fades in and
stays.

## Where each text lives

| Bundle | Scope | Notable content |
| --- | --- | --- |
| `INTRO` | Intro | Hotel, the Administrator's tall-people question |
| `HDAY1` | Day 1 | First pass over every object in the house |
| `HDAY2` | Day 2 | Second pass, warmest tone in the game |
| `HDAY3` | Day 3 | Third pass, souring; the hidden room discovery chain |
| `HDAY4` | Day 4 | Fourth pass, everything broken; the attic key |
| `HNIGHT1` | The night | Night pass over the same objects |
| `HDREAM1` | First dream | Light bulb, rusty key, the Girl's three lines |
| `HDREAM2` | Second dream | The lever puzzle, the Tall Man, the Purgatory rehearsal |
| `HDREAM3` | Last dream | Four lines |
| `HCAVE` | Catacombs | The Tall Man's two things, the cat, the well |
| `HCLUB` | Club | Barman, and the Girl outside |
| `HPAST` | The past | The note, the barman's directions, the hotel desk |
| `HEND` | Ending | Both endings and the entire psychologist scene |
| `HCREDITS` | Credits | Empty by design |
| `TEXT` | Global | Item names, note titles, and the full body text of every letter and diary page |

Item and note bodies are **only** in `TEXT`, under a key and the same key with a `_text`
suffix. That is where the father's papers actually live; the per-level bundles only hold the
protagonist's reactions to finding them.

## Recurring images

- **Looking back.** The intro dream moves the walls only when you turn around. The Tall Man's
  first piece of advice is to look back more often. The endings are entirely about that.
- **The double.** The father sees a man outside a hotel window who looks exactly like him. Four
  days in, the television shows the protagonist himself. The final level opens on him seeing
  himself standing in the room.
- **The well.** No bottom, a knocking sound, something the father concluded was alive. It is
  never explained, and the game never goes down it.
- **Night as the incompatibility.** She lived at night; he could not. The title names her
  condition, not his.
