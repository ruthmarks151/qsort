// Item Listing of Adult Core Q Sort
// SPECIFIED 9-POINT DISTRIBUTION (N = 100) 5, 8, 12, 16, 18, 16, 12, 8, 5
const ca_distribution = [5, 8, 12, 16, 18, 16, 12, 8, 5]
const ca_inventory = `1. Is critical, skeptical, not easily impressed.
2. Is a genuinely dependable and responsible person.
3. Has a wide range of interests. (NB.: Superficiality or depth of interest is irrelevant here.)
4. Is a talkative individual.
5. Behaves in a giving way toward others. (N.B.: Regardless of the motivation involved.)
6. Is fastidious. (NB.: Attentive to and concerned about accuracy and detail.)
7. Favors conservative values in a variety of areas.
8. Appears to have a high degree of intellectual capacity. (N.B.: Whether actualized or not. Originality is not necessarily assumed.)
9. Is uncomfortable with uncertainty and complexities.
10. Anxiety and tension find outlet in bodily symptoms. (N.B.: If placed high, implies bodily dysfunction; if placed low, implies absence of autonomic arousal.)
11. Is protective of those close to him. (NB.: Placement of this item expresses behavior ranging from over-protection through appropriate nurturance to a laissez-faire, under-protective manner.)
12. Tends to be self-defensive.
13. Is thin-skinned; vulnerable to anything that can be construed as criticism or an interpersonal slight.
14. Basically submissive.
15. The "light touch" as compared to the "heavy touch."
16. Is introspective. (N.B.: Introspectiveness per se does not imply insight.)
17. Behaves in a sympathetic or considerate manner.
18. Initiates humor.
19. Seeks reassurance from others.
20. Has a rapid personal tempo.
21. Arouses nurturant feelings in others of both sexes.
22. Feels a lack of personal meaning in life. (Uncharacteristic end means zest.)
23. Extrapunitive; tends to transfer or project blame.
24. Prides self on being "objective," rational. (Regardless of whether person is really objective or rational.)
25. Tends toward overcontrol of needs and impulses; binds tensions excessively; delays gratification unnecessarily.
26. Is productive; gets things done. (Regardless of speed.)
27. Shows condescending behavior in relations with others.
28. Tends to arouse liking and acceptance in people.
29. Is turned to for advice and reassurance.
30. Gives up and withdraws where possible in the face of frustra-tion and adversity.
31. Is satisfied with physical appearance.
32. Seems to be aware of the impression he/she makes on others.
33. Is calm, relaxed in manner.
34. Over-reactive to minor frustrations; irritable.
35. Has warmth; is compassionate.
36. Is negativistic; tends to undermine and obstruct or sabotage.
37. Is guileful and deceitful, manipulative, opportunistic.
38. Has hostility toward others. (NB.: Basic hostility is intended here; mode of expression is to be indicated by other items.)
39. Thinks and associates to ideas in unusual ways; has unconven-tional thought processes. (Either pathological or creative.)
40. Is vulnerable to real or fancied threat, generally fearful.
41. Is moralistic. (NB.: Regardless of the particular nature of the moral code.)
42. Reluctant to commit self to any definite course of action; tends to delay or avoid action. (Uncharacteristic end indicates quick to act.)
43. Is facially and/or gesturally expressive.
44. Evaluates the motivation of others in interpreting situations. (NB.: Accuracy of evaluation is not assumed. NB.: Again, extreme placement in one direction implies preoccupation with motivational interpretations; at the other extreme, the item implies a psychological obtuseness. S does not consider motivational factors.)
45. Has a brittle ego-defense system; has a small reserve of inte-gration; would be disorganized and maladaptive when under stress or trauma.
46. Engaged in personal fantasy and daydreams, fictional specula-tions.
47. Tends to feel guilty. (NB.: Regardless of whether verbalized or not.)
48. Aloof, keeps people at a distance; avoids close interpersonal relationships.
49. Is basically distrustful of people in general; questions their motivations.
50. Is unpredictable and changeable in behavior and attitudes.
51. Genuinely values intellectual and cognitive matters. (N.B.: Ability or achievement are not implied here.)
52. Behaves in an assertive fashion in interpersonal situations. (NB.: Item 14 reflects underlying submissiveness; this refers to overt behavior.)
53. Tends toward undercontrol of needs and impulses; unable to delay gratification.
54. Emphasizes being with others; gregarious.
55. Is self-defeating.
56. Responds to humor.
57. Is an interesting, arresting person.
58. Enjoys sensuous experiences(including touch, taste, smell, phys-ical contact).
59. Is concerned with own body and the adequacy of its physiologi-cal functioning. (Body cathexis.)
60. Has insight into own motives and behavior.
61. Creates and exploits dependency in people. (N.B.: Regardless of the techniques employed, e.g., punitiveness, overindulgence. NB.: At the other end of the scale, item implies respecting and encouraging the independence and individuality of others.)
62. Tends to be rebellious and nonconforming.
63. Judges self and others in conventional terms like "popularity," "the correct thing to do," social pressures, etc.
64. Is socially perceptive of a wide range of interpersonal cues.
65. Characteristically pushes and tries to stretch limits; sees what he can get away with.
66. Enjoys esthetic impressions; is esthetically reactive.
67. Is self-indulgent.
68. Is basically anxious.
69. Is bothered by anything that can be construed as a demand. (NB.: No implication of the kind of subsequent response is intended here.)
70. Behaves in an ethically consistent manner; is consistent with own personal standards.
71. Has high aspiration level for self.
72. Overconcerned with own adequacy as a person, either at con-scious or unconscious levels. (NB.: A clinical judgment is required here; number 74 reflects subjunctive satisfaction with self.)
73. Tends to perceive many different contexts in sexual terms; eroticizes situations.
74. Is consciously unaware of self-concern; feels satisfied with self.
75. Has a clear-cut, internally consistent personality. (NB.: Amount of information available before sorting is not intended here.)
76. Tends to project his own feelings and motivations onto others.
77. Appears straightforward, forthright, candid in dealings with others.
78. Feels cheated and victimized by life.
79. Tends to ruminate and have persistent, preoccupying thoughts (either pathological or creative).
80. Interested in members of the opposite sex. (NB.: At opposite end, item implies absence of such interest.)
81. Is physically attractive, good-looking. (NB.: The cultural cri-terion is to be applied here.)
82. Has fluctuating moods.
83. Able to see to the heart of important problems.
84. Is cheerful. (NB.: Extreme placement toward uncharacteristic end of continuum implies gloominess.)
85. Is self-pitying (whiny).
86. Handles anxiety and conflicts by repressive or dissociative ten-dencies.
87. Interprets basically simple and clear-cut situations in compli-cated and particularizing ways.
88. Is personally charming.
89. Compares self to others. Is alert to real or fancied differences between self and other people.
90. Is concerned with philosophical problems; e.g., religion, values, the meaning of life, etc.
91. Is power-oriented; values power in self or others.
92. Has social poise and presence; appears socially at ease.
93. Behaves in a style and manner consistent with their gender. (NB.: Again, the cultural or subcultural conception is to be applied as a criterion.)
94. Expresses hostile feelings directly.
95. Tends to proffer advice.
96. Values own independence and autonomy.
97. Is emotionally bland; has flattened affect.
98. Is verbally fluent; can express ideas well.
99. Is self-dramatizing; histrionic.
100. Does not vary roles; relates to everyone in the same way`.split("\n")

const sorts = {}
const distribution = [3, 5, 6, 7, 8, 7, 6, 5, 3];
const factorMap = {
   "1. Am the life of the party.":"1+",
   "2. Feel little concern for others.":"2-",
   "3. Am always prepared.":"3+",
   "4. Get stressed out easily.":"4-",
   "5. Have a rich vocabulary.":"5+",
   "6. Don't talk a lot.":"1-",
   "7. Am interested in people.":"2+",
   "8. Leave my belongings around.":"3-",
   "9. Am relaxed most of the time.":"4+",
   "10. Have difficulty understanding abstract ideas.":"5-",
   "11. Feel comfortable around people.":"1+",
   "12. Insult people.":"2-",
   "13. Pay attention to details.":"3+",
   "14. Worry about things.":"4-",
   "15. Have a vivid imagination.":"5+",
   "16. Keep in the background.":"1-",
   "17. Sympathize with others' feelings.":"2+",
   "18. Make a mess of things.":"3-",
   "19. Seldom feel blue.":"4+",
   "20. Am not interested in abstract ideas.":"5-",
   "21. Start conversations.":"1+",
   "22. Am not interested in other people's problems.":"2-",
   "23. Get chores done right away.":"3+",
   "24. Am easily disturbed.":"4-",
   "25. Have excellent ideas.":"5+",
   "26. Have little to say.":"1-",
   "27. Have a soft heart.":"2+",
   "28. Often forget to put things back in their proper place.":"3-",
   "29. Get upset easily.":"4-",
   "30. Do not have a good imagination.":"5-",
   "31. Talk to a lot of different people at parties.":"1+",
   "32. Am not really interested in others.":"2-",
   "33. Like order.":"3+",
   "34. Change my mood a lot.":"4-",
   "35. Am quick to understand things.":"5+",
   "36. Don't like to draw attention to myself.":"1-",
   "37. Take time out for others.":"2+",
   "38. Shirk my duties.":"3-",
   "39. Have frequent mood swings.":"4-",
   "40. Use difficult words.":"5+",
   "41. Don't mind being the center of attention.":"1+",
   "42. Feel others' emotions.":"2+",
   "43. Follow a schedule.":"3+",
   "44. Get irritated easily.":"4-",
   "45. Spend time reflecting on things.":"5+",
   "46. Am quiet around strangers.":"1-",
   "47. Make people feel at ease.":"2+",
   "48. Am exacting in my work.":"3+",
   "49. Often feel blue.":"4-",
   "50. Am full of ideas.":"5+"
}
const inventory = Object.keys(factorMap)


// Perfomed on 2019-11-27, no annealing
sorts["Ryan Self Sort 2019-11-27, no annealing"] = [
   [
      "36. Is negativistic; tends to undermine and obstruct or sabotage.",
      "37. Is guileful and deceitful, manipulative, opportunistic.",
      "38. Has hostility toward others. (NB.: Basic hostility is intended here; mode of expression is to be indicated by other items.)",
      "61. Creates and exploits dependency in people. (N.B.: Regardless of the techniques employed, e.g., punitiveness, overindulgence. NB.: At the other end of the scale, item implies respecting and encouraging the independence and individuality of others.)",
      "78. Feels cheated and victimized by life."
   ],
   [
      "69. Is bothered by anything that can be construed as a demand. (NB.: No implication of the kind of subsequent response is intended here.)",
      "73. Tends to perceive many different contexts in sexual terms; eroticizes situations.",
      "91. Is power-oriented; values power in self or others.",
      "49. Is basically distrustful of people in general; questions their motivations.",
      "52. Behaves in an assertive fashion in interpersonal situations. (NB.: Item 14 reflects underlying submissiveness; this refers to overt behavior.)",
      "63. Judges self and others in conventional terms like \"popularity,\" \"the correct thing to do,\" social pressures, etc.",
      "64. Is socially perceptive of a wide range of interpersonal cues.",
      "99. Is self-dramatizing; histrionic."
   ],
   [
      "7. Favors conservative values in a variety of areas.",
      "14. Basically submissive.",
      "22. Feels a lack of personal meaning in life. (Uncharacteristic end means zest.)",
      "32. Seems to be aware of the impression he/she makes on others.",
      "40. Is vulnerable to real or fancied threat, generally fearful.",
      "44. Evaluates the motivation of others in interpreting situations. (NB.: Accuracy of evaluation is not assumed. NB.: Again, extreme placement in one direction implies preoccupation with motivational interpretations; at the other extreme, the item implies a psychological obtuseness. S does not consider motivational factors.)",
      "46. Engaged in personal fantasy and daydreams, fictional specula-tions.",
      "47. Tends to feel guilty. (NB.: Regardless of whether verbalized or not.)",
      "50. Is unpredictable and changeable in behavior and attitudes.",
      "59. Is concerned with own body and the adequacy of its physiologi-cal functioning. (Body cathexis.)",
      "89. Compares self to others. Is alert to real or fancied differences between self and other people.",
      "92. Has social poise and presence; appears socially at ease."
   ],
   [
      "11. Is protective of those close to him. (NB.: Placement of this item expresses behavior ranging from over-protection through appropriate nurturance to a laissez-faire, under-protective manner.)",
      "23. Extrapunitive; tends to transfer or project blame.",
      "27. Shows condescending behavior in relations with others.",
      "48. Aloof, keeps people at a distance; avoids close interpersonal relationships.",
      "55. Is self-defeating.",
      "65. Characteristically pushes and tries to stretch limits; sees what he can get away with.",
      "72. Overconcerned with own adequacy as a person, either at con-scious or unconscious levels. (NB.: A clinical judgment is required here; number 74 reflects subjunctive satisfaction with self.)",
      "76. Tends to project his own feelings and motivations onto others.",
      "85. Is self-pitying (whiny).",
      "15. The \"light touch\" as compared to the \"heavy touch.\"",
      "16. Is introspective. (N.B.: Introspectiveness per se does not imply insight.)",
      "19. Seeks reassurance from others.",
      "21. Arouses nurturant feelings in others of both sexes.",
      "29. Is turned to for advice and reassurance.",
      "87. Interprets basically simple and clear-cut situations in compli-cated and particularizing ways.",
      "100. Does not vary roles; relates to everyone in the same way"
   ],
   [
      "12. Tends to be self-defensive.",
      "34. Over-reactive to minor frustrations; irritable.",
      "41. Is moralistic. (NB.: Regardless of the particular nature of the moral code.)",
      "60. Has insight into own motives and behavior.",
      "62. Tends to be rebellious and nonconforming.",
      "71. Has high aspiration level for self.",
      "97. Is emotionally bland; has flattened affect.",
      "4. Is a talkative individual.",
      "13. Is thin-skinned; vulnerable to anything that can be construed as criticism or an interpersonal slight.",
      "54. Emphasizes being with others; gregarious.",
      "88. Is personally charming.",
      "30. Gives up and withdraws where possible in the face of frustra-tion and adversity.",
      "35. Has warmth; is compassionate.",
      "45. Has a brittle ego-defense system; has a small reserve of inte-gration; would be disorganized and maladaptive when under stress or trauma.",
      "53. Tends toward undercontrol of needs and impulses; unable to delay gratification.",
      "68. Is basically anxious.",
      "75. Has a clear-cut, internally consistent personality. (NB.: Amount of information available before sorting is not intended here.)",
      "94. Expresses hostile feelings directly."
   ],
   [
      "2. Is a genuinely dependable and responsible person.",
      "3. Has a wide range of interests. (NB.: Superficiality or depth of interest is irrelevant here.)",
      "20. Has a rapid personal tempo.",
      "26. Is productive; gets things done. (Regardless of speed.)",
      "57. Is an interesting, arresting person.",
      "66. Enjoys esthetic impressions; is esthetically reactive.",
      "67. Is self-indulgent.",
      "77. Appears straightforward, forthright, candid in dealings with others.",
      "79. Tends to ruminate and have persistent, preoccupying thoughts (either pathological or creative).",
      "81. Is physically attractive, good-looking. (NB.: The cultural cri-terion is to be applied here.)",
      "82. Has fluctuating moods.",
      "83. Able to see to the heart of important problems.",
      "86. Handles anxiety and conflicts by repressive or dissociative ten-dencies.",
      "90. Is concerned with philosophical problems; e.g., religion, values, the meaning of life, etc.",
      "93. Behaves in a style and manner consistent with their gender. (NB.: Again, the cultural or subcultural conception is to be applied as a criterion.)",
      "95. Tends to proffer advice."
   ],
   [
      "17. Behaves in a sympathetic or considerate manner.",
      "1. Is critical, skeptical, not easily impressed.",
      "6. Is fastidious. (NB.: Attentive to and concerned about accuracy and detail.)",
      "9. Is uncomfortable with uncertainty and complexities.",
      "10. Anxiety and tension find outlet in bodily symptoms. (N.B.: If placed high, implies bodily dysfunction; if placed low, implies absence of autonomic arousal.)",
      "25. Tends toward overcontrol of needs and impulses; binds tensions excessively; delays gratification unnecessarily.",
      "28. Tends to arouse liking and acceptance in people.",
      "31. Is satisfied with physical appearance.",
      "42. Reluctant to commit self to any definite course of action; tends to delay or avoid action. (Uncharacteristic end indicates quick to act.)",
      "43. Is facially and/or gesturally expressive.",
      "74. Is consciously unaware of self-concern; feels satisfied with self.",
      "80. Interested in members of the opposite sex. (NB.: At opposite end, item implies absence of such interest.)"
   ],
   [
      "5. Behaves in a giving way toward others. (N.B.: Regardless of the motivation involved.)",
      "33. Is calm, relaxed in manner.",
      "58. Enjoys sensuous experiences(including touch, taste, smell, phys-ical contact).",
      "70. Behaves in an ethically consistent manner; is consistent with own personal standards.",
      "84. Is cheerful. (NB.: Extreme placement toward uncharacteristic end of continuum implies gloominess.)",
      "96. Values own independence and autonomy.",
      "98. Is verbally fluent; can express ideas well.",
      "56. Responds to humor."
   ],
   [
      "8. Appears to have a high degree of intellectual capacity. (N.B.: Whether actualized or not. Originality is not necessarily assumed.)",
      "18. Initiates humor.",
      "24. Prides self on being \"objective,\" rational. (Regardless of whether person is really objective or rational.)",
      "39. Thinks and associates to ideas in unusual ways; has unconven-tional thought processes. (Either pathological or creative.)",
      "51. Genuinely values intellectual and cognitive matters. (N.B.: Ability or achievement are not implied here.)"
   ]
]

sorts["Ryan Self Sort 2019-11-27, annealed"] = [

["8. Appears to have a high degree of intellectual capacity. (N.B.: Whether actualized or not. Originality is not necessarily assumed.)","18. Initiates humor.","24. Prides self on being \"objective,\" rational. (Regardless of whether person is really objective or rational.)","39. Thinks and associates to ideas in unusual ways; has unconven-tional thought processes. (Either pathological or creative.)","51. Genuinely values intellectual and cognitive matters. (N.B.: Ability or achievement are not implied here.)"]

  ,["69. Is bothered by anything that can be construed as a demand. (NB.: No implication of the kind of subsequent response is intended here.)","73. Tends to perceive many different contexts in sexual terms; eroticizes situations.","91. Is power-oriented; values power in self or others.","49. Is basically distrustful of people in general; questions their motivations.","52. Behaves in an assertive fashion in interpersonal situations. (NB.: Item 14 reflects underlying submissiveness; this refers to overt behavior.)","63. Judges self and others in conventional terms like \"popularity,\" \"the correct thing to do,\" social pressures, etc.","64. Is socially perceptive of a wide range of interpersonal cues.","99. Is self-dramatizing; histrionic."],["7. Favors conservative values in a variety of areas.","14. Basically submissive.","22. Feels a lack of personal meaning in life. (Uncharacteristic end means zest.)","32. Seems to be aware of the impression he/she makes on others.","40. Is vulnerable to real or fancied threat, generally fearful.","44. Evaluates the motivation of others in interpreting situations. (NB.: Accuracy of evaluation is not assumed. NB.: Again, extreme placement in one direction implies preoccupation with motivational interpretations; at the other extreme, the item implies a psychological obtuseness. S does not consider motivational factors.)","46. Engaged in personal fantasy and daydreams, fictional specula-tions.","47. Tends to feel guilty. (NB.: Regardless of whether verbalized or not.)","50. Is unpredictable and changeable in behavior and attitudes.","59. Is concerned with own body and the adequacy of its physiologi-cal functioning. (Body cathexis.)","89. Compares self to others. Is alert to real or fancied differences between self and other people.","92. Has social poise and presence; appears socially at ease."],["11. Is protective of those close to him. (NB.: Placement of this item expresses behavior ranging from over-protection through appropriate nurturance to a laissez-faire, under-protective manner.)","23. Extrapunitive; tends to transfer or project blame.","27. Shows condescending behavior in relations with others.","48. Aloof, keeps people at a distance; avoids close interpersonal relationships.","55. Is self-defeating.","65. Characteristically pushes and tries to stretch limits; sees what he can get away with.","72. Overconcerned with own adequacy as a person, either at con-scious or unconscious levels. (NB.: A clinical judgment is required here; number 74 reflects subjunctive satisfaction with self.)","76. Tends to project his own feelings and motivations onto others.","85. Is self-pitying (whiny).","15. The \"light touch\" as compared to the \"heavy touch.\"","16. Is introspective. (N.B.: Introspectiveness per se does not imply insight.)","19. Seeks reassurance from others.","21. Arouses nurturant feelings in others of both sexes.","29. Is turned to for advice and reassurance.","87. Interprets basically simple and clear-cut situations in compli-cated and particularizing ways.","100. Does not vary roles; relates to everyone in the same way"],["12. Tends to be self-defensive.","34. Over-reactive to minor frustrations; irritable.","41. Is moralistic. (NB.: Regardless of the particular nature of the moral code.)","60. Has insight into own motives and behavior.","62. Tends to be rebellious and nonconforming.","71. Has high aspiration level for self.","97. Is emotionally bland; has flattened affect.","4. Is a talkative individual.","13. Is thin-skinned; vulnerable to anything that can be construed as criticism or an interpersonal slight.","54. Emphasizes being with others; gregarious.","88. Is personally charming.","30. Gives up and withdraws where possible in the face of frustra-tion and adversity.","35. Has warmth; is compassionate.","45. Has a brittle ego-defense system; has a small reserve of inte-gration; would be disorganized and maladaptive when under stress or trauma.","53. Tends toward undercontrol of needs and impulses; unable to delay gratification.","68. Is basically anxious.","75. Has a clear-cut, internally consistent personality. (NB.: Amount of information available before sorting is not intended here.)","94. Expresses hostile feelings directly."],["2. Is a genuinely dependable and responsible person.","3. Has a wide range of interests. (NB.: Superficiality or depth of interest is irrelevant here.)","20. Has a rapid personal tempo.","26. Is productive; gets things done. (Regardless of speed.)","57. Is an interesting, arresting person.","66. Enjoys esthetic impressions; is esthetically reactive.","67. Is self-indulgent.","77. Appears straightforward, forthright, candid in dealings with others.","79. Tends to ruminate and have persistent, preoccupying thoughts (either pathological or creative).","81. Is physically attractive, good-looking. (NB.: The cultural cri-terion is to be applied here.)","82. Has fluctuating moods.","83. Able to see to the heart of important problems.","86. Handles anxiety and conflicts by repressive or dissociative ten-dencies.","90. Is concerned with philosophical problems; e.g., religion, values, the meaning of life, etc.","93. Behaves in a style and manner consistent with their gender. (NB.: Again, the cultural or subcultural conception is to be applied as a criterion.)","95. Tends to proffer advice."],["17. Behaves in a sympathetic or considerate manner.","1. Is critical, skeptical, not easily impressed.","6. Is fastidious. (NB.: Attentive to and concerned about accuracy and detail.)","9. Is uncomfortable with uncertainty and complexities.","10. Anxiety and tension find outlet in bodily symptoms. (N.B.: If placed high, implies bodily dysfunction; if placed low, implies absence of autonomic arousal.)","25. Tends toward overcontrol of needs and impulses; binds tensions excessively; delays gratification unnecessarily.","28. Tends to arouse liking and acceptance in people.","31. Is satisfied with physical appearance.","42. Reluctant to commit self to any definite course of action; tends to delay or avoid action. (Uncharacteristic end indicates quick to act.)","43. Is facially and/or gesturally expressive.","74. Is consciously unaware of self-concern; feels satisfied with self.","80. Interested in members of the opposite sex. (NB.: At opposite end, item implies absence of such interest.)"],["5. Behaves in a giving way toward others. (N.B.: Regardless of the motivation involved.)","33. Is calm, relaxed in manner.","58. Enjoys sensuous experiences(including touch, taste, smell, phys-ical contact).","70. Behaves in an ethically consistent manner; is consistent with own personal standards.","84. Is cheerful. (NB.: Extreme placement toward uncharacteristic end of continuum implies gloominess.)","96. Values own independence and autonomy.","98. Is verbally fluent; can express ideas well.","56. Responds to humor."],

  ["36. Is negativistic; tends to undermine and obstruct or sabotage.","37. Is guileful and deceitful, manipulative, opportunistic.","38. Has hostility toward others. (NB.: Basic hostility is intended here; mode of expression is to be indicated by other items.)","61. Creates and exploits dependency in people. (N.B.: Regardless of the techniques employed, e.g., punitiveness, overindulgence. NB.: At the other end of the scale, item implies respecting and encouraging the independence and individuality of others.)","78. Feels cheated and victimized by life."]

  ]

sorts["Ryan Ideal Sort 2019-11-27, annealed"] = [
   [ //5
      "30. Gives up and withdraws where possible in the face of frustra-tion and adversity.",
      "36. Is negativistic; tends to undermine and obstruct or sabotage.",
      "37. Is guileful and deceitful, manipulative, opportunistic.",
      "49. Is basically distrustful of people in general; questions their motivations.",
      "61. Creates and exploits dependency in people. (N.B.: Regardless of the techniques employed, e.g., punitiveness, overindulgence. NB.: At the other end of the scale, item implies respecting and encouraging the independence and individuality of others.)"
   ],
   [ //8
      "12. Tends to be self-defensive.",
      "13. Is thin-skinned; vulnerable to anything that can be construed as criticism or an interpersonal slight.",
      "22. Feels a lack of personal meaning in life. (Uncharacteristic end means zest.)",
      "23. Extrapunitive; tends to transfer or project blame.",
      "27. Shows condescending behavior in relations with others.",
      "34. Over-reactive to minor frustrations; irritable.",
      "38. Has hostility toward others. (NB.: Basic hostility is intended here; mode of expression is to be indicated by other items.)",
      "85. Is self-pitying (whiny)."
   ],
   [ //12
      "40. Is vulnerable to real or fancied threat, generally fearful.",
      "45. Has a brittle ego-defense system; has a small reserve of inte-gration; would be disorganized and maladaptive when under stress or trauma.",
      "48. Aloof, keeps people at a distance; avoids close interpersonal relationships.",
      "55. Is self-defeating.",
      "68. Is basically anxious.",
      "78. Feels cheated and victimized by life.",
      "91. Is power-oriented; values power in self or others.",
      "99. Is self-dramatizing; histrionic.",
      "7. Favors conservative values in a variety of areas.",
      "42. Reluctant to commit self to any definite course of action; tends to delay or avoid action. (Uncharacteristic end indicates quick to act.)",
      "47. Tends to feel guilty. (NB.: Regardless of whether verbalized or not.)",
      "72. Overconcerned with own adequacy as a person, either at con-scious or unconscious levels. (NB.: A clinical judgment is required here; number 74 reflects subjunctive satisfaction with self.)"
   ],
   [ // 16
      "62. Tends to be rebellious and nonconforming.",
      "65. Characteristically pushes and tries to stretch limits; sees what he can get away with.",
      "9. Is uncomfortable with uncertainty and complexities.",
      "11. Is protective of those close to him. (NB.: Placement of this item expresses behavior ranging from over-protection through appropriate nurturance to a laissez-faire, under-protective manner.)",
      "14. Basically submissive.",
      "25. Tends toward overcontrol of needs and impulses; binds tensions excessively; delays gratification unnecessarily.",
      "50. Is unpredictable and changeable in behavior and attitudes.",
      "53. Tends toward undercontrol of needs and impulses; unable to delay gratification.",
      "59. Is concerned with own body and the adequacy of its physiologi-cal functioning. (Body cathexis.)",
      "63. Judges self and others in conventional terms like \"popularity,\" \"the correct thing to do,\" social pressures, etc.",
      "67. Is self-indulgent.",
      "73. Tends to perceive many different contexts in sexual terms; eroticizes situations.",
      "76. Tends to project his own feelings and motivations onto others.",
      "89. Compares self to others. Is alert to real or fancied differences between self and other people.",
      "86. Handles anxiety and conflicts by repressive or dissociative ten-dencies.",
      "69. Is bothered by anything that can be construed as a demand. (NB.: No implication of the kind of subsequent response is intended here.)"
   ],

   [//18


     '1. Is critical, skeptical, not easily impressed.',
     '15. The "light touch" as compared to the "heavy touch."',
     '52. Behaves in an assertive fashion in interpersonal situations. (NB.: Item 14 reflects underlying submissiveness; this refers to overt behavior.)',
   '44. Evaluates the motivation of others in interpreting situations. (NB.: Accuracy of evaluation is not assumed. NB.: Again, extreme placement in one direction implies preoccupation with motivational interpretations; at the other extreme, the item implies a psychological obtuseness. S does not consider motivational factors.)',
   '46. Engaged in personal fantasy and daydreams, fictional specula-tions.',
   '19. Seeks reassurance from others.',
   '21. Arouses nurturant feelings in others of both sexes.',
   '87. Interprets basically simple and clear-cut situations in compli-cated and particularizing ways.',
   '41. Is moralistic. (NB.: Regardless of the particular nature of the moral code.)',
   '97. Is emotionally bland; has flattened affect.',
   '4. Is a talkative individual.',
   '94. Expresses hostile feelings directly.',
   '93. Behaves in a style and manner consistent with their gender. (NB.: Again, the cultural or subcultural conception is to be applied as a criterion.)',
   '95. Tends to proffer advice.',
   '82. Has fluctuating moods.',
   '20. Has a rapid personal tempo.',
   '10. Anxiety and tension find outlet in bodily symptoms. (N.B.: If placed high, implies bodily dysfunction; if placed low, implies absence of autonomic arousal.)',
   '80. Interested in members of the opposite sex. (NB.: At opposite end, item implies absence of such interest.)',
 ],
 [//16
   '84. Is cheerful. (NB.: Extreme placement toward uncharacteristic end of continuum implies gloominess.)',
   '92. Has social poise and presence; appears socially at ease.',
   '100. Does not vary roles; relates to everyone in the same way',
   '54. Emphasizes being with others; gregarious.',
   '58. Enjoys sensuous experiences(including touch, taste, smell, phys-ical contact).',
   '31. Is satisfied with physical appearance.',
   '43. Is facially and/or gesturally expressive.',
   '66. Enjoys esthetic impressions; is esthetically reactive.',
   '79. Tends to ruminate and have persistent, preoccupying thoughts (either pathological or creative).',
   '81. Is physically attractive, good-looking. (NB.: The cultural cri-terion is to be applied here.)',
   '90. Is concerned with philosophical problems; e.g., religion, values, the meaning of life, etc.',
   '24. Prides self on being "objective," rational. (Regardless of whether person is really objective or rational.)',
   '39. Thinks and associates to ideas in unusual ways; has unconven-tional thought processes. (Either pathological or creative.)',
   '88. Is personally charming.',
   '6. Is fastidious. (NB.: Attentive to and concerned about accuracy and detail.)',
   '96. Values own independence and autonomy.',

 ],
   [ //12
      "3. Has a wide range of interests. (NB.: Superficiality or depth of interest is irrelevant here.)",
      "16. Is introspective. (N.B.: Introspectiveness per se does not imply insight.)",
      "18. Initiates humor.",
      "26. Is productive; gets things done. (Regardless of speed.)",
      "29. Is turned to for advice and reassurance.",
      "32. Seems to be aware of the impression he/she makes on others.",
      "33. Is calm, relaxed in manner.",
      "56. Responds to humor.",
      "64. Is socially perceptive of a wide range of interpersonal cues.",
      "71. Has high aspiration level for self.",
      "83. Able to see to the heart of important problems.",
      "98. Is verbally fluent; can express ideas well."
   ],


   [ //8
      "8. Appears to have a high degree of intellectual capacity. (N.B.: Whether actualized or not. Originality is not necessarily assumed.)",
      "28. Tends to arouse liking and acceptance in people.",
      "74. Is consciously unaware of self-concern; feels satisfied with self.",
      "75. Has a clear-cut, internally consistent personality. (NB.: Amount of information available before sorting is not intended here.)",
      "77. Appears straightforward, forthright, candid in dealings with others.",
      "51. Genuinely values intellectual and cognitive matters. (N.B.: Ability or achievement are not implied here.)",
      "57. Is an interesting, arresting person.",
      "60. Has insight into own motives and behavior."
   ],
   [
      "2. Is a genuinely dependable and responsible person.",
      "5. Behaves in a giving way toward others. (N.B.: Regardless of the motivation involved.)",
      "17. Behaves in a sympathetic or considerate manner.",
      "35. Has warmth; is compassionate.",
      "70. Behaves in an ethically consistent manner; is consistent with own personal standards."
   ]
]

sorts['ryan_self_5'] = [["1. Am the life of the party.","2. Feel little concern for others.","12. Insult people."],["10. Have difficulty understanding abstract ideas.","20. Am not interested in abstract ideas.","26. Have little to say.","44. Get irritated easily.","49. Often feel blue."],["15. Have a vivid imagination.","29. Get upset easily.","38. Shirk my duties.","39. Have frequent mood swings.","42. Feel others' emotions.","32. Am not really interested in others."],["3. Am always prepared.","6. Don't talk a lot.","18. Make a mess of things.","22. Am not interested in other people's problems.","34. Change my mood a lot.","43. Follow a schedule.","23. Get chores done right away."],["11. Feel comfortable around people.","37. Take time out for others.","4. Get stressed out easily.","7. Am interested in people.","14. Worry about things.","31. Talk to a lot of different people at parties.","41. Don't mind being the center of attention.","16. Keep in the background."],["19. Seldom feel blue.","21. Start conversations.","24. Am easily disturbed.","27. Have a soft heart.","47. Make people feel at ease.","17. Sympathize with others' feelings.","30. Do not have a good imagination."],["9. Am relaxed most of the time.","45. Spend time reflecting on things.","13. Pay attention to details.","25. Have excellent ideas.","28. Often forget to put things back in their proper place.","8. Leave my belongings around."],["33. Like order.","36. Don't like to draw attention to myself.","40. Use difficult words.","46. Am quiet around strangers.","48. Am exacting in my work."],["5. Have a rich vocabulary.","35. Am quick to understand things.","50. Am full of ideas."]]

sorts['ryan_ideal_5'] = [["2. Feel little concern for others.","12. Insult people.","38. Shirk my duties."],["22. Am not interested in other people's problems.","29. Get upset easily.","32. Am not really interested in others.","44. Get irritated easily.","49. Often feel blue."],["4. Get stressed out easily.","10. Have difficulty understanding abstract ideas.","14. Worry about things.","18. Make a mess of things.","30. Do not have a good imagination.","39. Have frequent mood swings."],["8. Leave my belongings around.","16. Keep in the background.","26. Have little to say.","20. Am not interested in abstract ideas.","28. Often forget to put things back in their proper place.","34. Change my mood a lot.","46. Am quiet around strangers."],["3. Am always prepared.","31. Talk to a lot of different people at parties.","33. Like order.","43. Follow a schedule.","24. Am easily disturbed.","36. Don't like to draw attention to myself.","40. Use difficult words.","6. Don't talk a lot."],["19. Seldom feel blue.","23. Get chores done right away.","41. Don't mind being the center of attention.","48. Am exacting in my work.","1. Am the life of the party.","7. Am interested in people.","15. Have a vivid imagination."],["9. Am relaxed most of the time.","11. Feel comfortable around people.","13. Pay attention to details.","21. Start conversations.","27. Have a soft heart.","47. Make people feel at ease."],["17. Sympathize with others' feelings.","37. Take time out for others.","45. Spend time reflecting on things.","5. Have a rich vocabulary.","50. Am full of ideas."],["25. Have excellent ideas.","35. Am quick to understand things.","42. Feel others' emotions."]]
export {inventory, distribution, sorts, factorMap};
