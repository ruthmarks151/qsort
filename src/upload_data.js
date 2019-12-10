import {databaseRef, Timestamp} from "./firebase";

debugger

function pushSortTypes(){
    databaseRef.doc("sortTypes/california_100")
        .set({
            name: "100-item California Q-Sort",
            factors: [],
            distribution: [5, 8, 12, 16, 18, 16, 12, 8, 5],
            statements: [{
                "statement": "1. Is critical, skeptical, not easily impressed.",
                "factors": []
            }, {
                "statement": "2. Is a genuinely dependable and responsible person.",
                "factors": []
            }, {
                "statement": "3. Has a wide range of interests. (NB.: Superficiality or depth of interest is irrelevant here.)",
                "factors": []
            }, {
                "statement": "4. Is a talkative individual.",
                "factors": []
            }, {
                "statement": "5. Behaves in a giving way toward others. (N.B.: Regardless of the motivation involved.)",
                "factors": []
            }, {
                "statement": "6. Is fastidious. (NB.: Attentive to and concerned about accuracy and detail.)",
                "factors": []
            }, {
                "statement": "7. Favors conservative values in a variety of areas.",
                "factors": []
            }, {
                "statement": "8. Appears to have a high degree of intellectual capacity. (N.B.: Whether actualized or not. Originality is not necessarily assumed.)",
                "factors": []
            }, {
                "statement": "9. Is uncomfortable with uncertainty and complexities.",
                "factors": []
            }, {
                "statement": "10. Anxiety and tension find outlet in bodily symptoms. (N.B.: If placed high, implies bodily dysfunction; if placed low, implies absence of autonomic arousal.)",
                "factors": []
            }, {
                "statement": "11. Is protective of those close to him. (NB.: Placement of this item expresses behavior ranging from over-protection through appropriate nurturance to a laissez-faire, under-protective manner.)",
                "factors": []
            }, {
                "statement": "12. Tends to be self-defensive.",
                "factors": []
            }, {
                "statement": "13. Is thin-skinned; vulnerable to anything that can be construed as criticism or an interpersonal slight.",
                "factors": []
            }, {
                "statement": "14. Basically submissive.",
                "factors": []
            }, {
                "statement": "15. The \"light touch\" as compared to the \"heavy touch.\"",
                "factors": []
            }, {
                "statement": "16. Is introspective. (N.B.: Introspectiveness per se does not imply insight.)",
                "factors": []
            }, {
                "statement": "17. Behaves in a sympathetic or considerate manner.",
                "factors": []
            }, {"statement": "18. Initiates humor.", "factors": []}, {
                "statement": "19. Seeks reassurance from others.",
                "factors": []
            }, {
                "statement": "20. Has a rapid personal tempo.",
                "factors": []
            }, {
                "statement": "21. Arouses nurturant feelings in others of both sexes.",
                "factors": []
            }, {
                "statement": "22. Feels a lack of personal meaning in life. (Uncharacteristic end means zest.)",
                "factors": []
            }, {
                "statement": "23. Extrapunitive; tends to transfer or project blame.",
                "factors": []
            }, {
                "statement": "24. Prides self on being \"objective,\" rational. (Regardless of whether person is really objective or rational.)",
                "factors": []
            }, {
                "statement": "25. Tends toward overcontrol of needs and impulses; binds tensions excessively; delays gratification unnecessarily.",
                "factors": []
            }, {
                "statement": "26. Is productive; gets things done. (Regardless of speed.)",
                "factors": []
            }, {
                "statement": "27. Shows condescending behavior in relations with others.",
                "factors": []
            }, {
                "statement": "28. Tends to arouse liking and acceptance in people.",
                "factors": []
            }, {
                "statement": "29. Is turned to for advice and reassurance.",
                "factors": []
            }, {
                "statement": "30. Gives up and withdraws where possible in the face of frustra-tion and adversity.",
                "factors": []
            }, {
                "statement": "31. Is satisfied with physical appearance.",
                "factors": []
            }, {
                "statement": "32. Seems to be aware of the impression he/she makes on others.",
                "factors": []
            }, {
                "statement": "33. Is calm, relaxed in manner.",
                "factors": []
            }, {
                "statement": "34. Over-reactive to minor frustrations; irritable.",
                "factors": []
            }, {
                "statement": "35. Has warmth; is compassionate.",
                "factors": []
            }, {
                "statement": "36. Is negativistic; tends to undermine and obstruct or sabotage.",
                "factors": []
            }, {
                "statement": "37. Is guileful and deceitful, manipulative, opportunistic.",
                "factors": []
            }, {
                "statement": "38. Has hostility toward others. (NB.: Basic hostility is intended here; mode of expression is to be indicated by other items.)",
                "factors": []
            }, {
                "statement": "39. Thinks and associates to ideas in unusual ways; has unconven-tional thought processes. (Either pathological or creative.)",
                "factors": []
            }, {
                "statement": "40. Is vulnerable to real or fancied threat, generally fearful.",
                "factors": []
            }, {
                "statement": "41. Is moralistic. (NB.: Regardless of the particular nature of the moral code.)",
                "factors": []
            }, {
                "statement": "42. Reluctant to commit self to any definite course of action; tends to delay or avoid action. (Uncharacteristic end indicates quick to act.)",
                "factors": []
            }, {
                "statement": "43. Is facially and/or gesturally expressive.",
                "factors": []
            }, {
                "statement": "44. Evaluates the motivation of others in interpreting situations. (NB.: Accuracy of evaluation is not assumed. NB.: Again, extreme placement in one direction implies preoccupation with motivational interpretations; at the other extreme, the item implies a psychological obtuseness. S does not consider motivational factors.)",
                "factors": []
            }, {
                "statement": "45. Has a brittle ego-defense system; has a small reserve of inte-gration; would be disorganized and maladaptive when under stress or trauma.",
                "factors": []
            }, {
                "statement": "46. Engaged in personal fantasy and daydreams, fictional specula-tions.",
                "factors": []
            }, {
                "statement": "47. Tends to feel guilty. (NB.: Regardless of whether verbalized or not.)",
                "factors": []
            }, {
                "statement": "48. Aloof, keeps people at a distance; avoids close interpersonal relationships.",
                "factors": []
            }, {
                "statement": "49. Is basically distrustful of people in general; questions their motivations.",
                "factors": []
            }, {
                "statement": "50. Is unpredictable and changeable in behavior and attitudes.",
                "factors": []
            }, {
                "statement": "51. Genuinely values intellectual and cognitive matters. (N.B.: Ability or achievement are not implied here.)",
                "factors": []
            }, {
                "statement": "52. Behaves in an assertive fashion in interpersonal situations. (NB.: Item 14 reflects underlying submissiveness; this refers to overt behavior.)",
                "factors": []
            }, {
                "statement": "53. Tends toward undercontrol of needs and impulses; unable to delay gratification.",
                "factors": []
            }, {
                "statement": "54. Emphasizes being with others; gregarious.",
                "factors": []
            }, {
                "statement": "55. Is self-defeating.",
                "factors": []
            }, {
                "statement": "56. Responds to humor.",
                "factors": []
            }, {
                "statement": "57. Is an interesting, arresting person.",
                "factors": []
            }, {
                "statement": "58. Enjoys sensuous experiences(including touch, taste, smell, phys-ical contact).",
                "factors": []
            }, {
                "statement": "59. Is concerned with own body and the adequacy of its physiologi-cal functioning. (Body cathexis.)",
                "factors": []
            }, {
                "statement": "60. Has insight into own motives and behavior.",
                "factors": []
            }, {
                "statement": "61. Creates and exploits dependency in people. (N.B.: Regardless of the techniques employed, e.g., punitiveness, overindulgence. NB.: At the other end of the scale, item implies respecting and encouraging the independence and individuality of others.)",
                "factors": []
            }, {
                "statement": "62. Tends to be rebellious and nonconforming.",
                "factors": []
            }, {
                "statement": "63. Judges self and others in conventional terms like \"popularity,\" \"the correct thing to do,\" social pressures, etc.",
                "factors": []
            }, {
                "statement": "64. Is socially perceptive of a wide range of interpersonal cues.",
                "factors": []
            }, {
                "statement": "65. Characteristically pushes and tries to stretch limits; sees what he can get away with.",
                "factors": []
            }, {
                "statement": "66. Enjoys esthetic impressions; is esthetically reactive.",
                "factors": []
            }, {"statement": "67. Is self-indulgent.", "factors": []}, {
                "statement": "68. Is basically anxious.",
                "factors": []
            }, {
                "statement": "69. Is bothered by anything that can be construed as a demand. (NB.: No implication of the kind of subsequent response is intended here.)",
                "factors": []
            }, {
                "statement": "70. Behaves in an ethically consistent manner; is consistent with own personal standards.",
                "factors": []
            }, {
                "statement": "71. Has high aspiration level for self.",
                "factors": []
            }, {
                "statement": "72. Overconcerned with own adequacy as a person, either at con-scious or unconscious levels. (NB.: A clinical judgment is required here; number 74 reflects subjunctive satisfaction with self.)",
                "factors": []
            }, {
                "statement": "73. Tends to perceive many different contexts in sexual terms; eroticizes situations.",
                "factors": []
            }, {
                "statement": "74. Is consciously unaware of self-concern; feels satisfied with self.",
                "factors": []
            }, {
                "statement": "75. Has a clear-cut, internally consistent personality. (NB.: Amount of information available before sorting is not intended here.)",
                "factors": []
            }, {
                "statement": "76. Tends to project his own feelings and motivations onto others.",
                "factors": []
            }, {
                "statement": "77. Appears straightforward, forthright, candid in dealings with others.",
                "factors": []
            }, {
                "statement": "78. Feels cheated and victimized by life.",
                "factors": []
            }, {
                "statement": "79. Tends to ruminate and have persistent, preoccupying thoughts (either pathological or creative).",
                "factors": []
            }, {
                "statement": "80. Interested in members of the opposite sex. (NB.: At opposite end, item implies absence of such interest.)",
                "factors": []
            }, {
                "statement": "81. Is physically attractive, good-looking. (NB.: The cultural cri-terion is to be applied here.)",
                "factors": []
            }, {
                "statement": "82. Has fluctuating moods.",
                "factors": []
            }, {
                "statement": "83. Able to see to the heart of important problems.",
                "factors": []
            }, {
                "statement": "84. Is cheerful. (NB.: Extreme placement toward uncharacteristic end of continuum implies gloominess.)",
                "factors": []
            }, {
                "statement": "85. Is self-pitying (whiny).",
                "factors": []
            }, {
                "statement": "86. Handles anxiety and conflicts by repressive or dissociative ten-dencies.",
                "factors": []
            }, {
                "statement": "87. Interprets basically simple and clear-cut situations in compli-cated and particularizing ways.",
                "factors": []
            }, {
                "statement": "88. Is personally charming.",
                "factors": []
            }, {
                "statement": "89. Compares self to others. Is alert to real or fancied differences between self and other people.",
                "factors": []
            }, {
                "statement": "90. Is concerned with philosophical problems; e.g., religion, values, the meaning of life, etc.",
                "factors": []
            }, {
                "statement": "91. Is power-oriented; values power in self or others.",
                "factors": []
            }, {
                "statement": "92. Has social poise and presence; appears socially at ease.",
                "factors": []
            }, {
                "statement": "93. Behaves in a style and manner consistent with their gender. (NB.: Again, the cultural or subcultural conception is to be applied as a criterion.)",
                "factors": []
            }, {
                "statement": "94. Expresses hostile feelings directly.",
                "factors": []
            }, {
                "statement": "95. Tends to proffer advice.",
                "factors": []
            }, {
                "statement": "96. Values own independence and autonomy.",
                "factors": []
            }, {
                "statement": "97. Is emotionally bland; has flattened affect.",
                "factors": []
            }, {
                "statement": "98. Is verbally fluent; can express ideas well.",
                "factors": []
            }, {
                "statement": "99. Is self-dramatizing; histrionic.",
                "factors": []
            }, {
                "statement": "100. Does not vary roles; relates to everyone in the same way",
                "factors": []
            }]
        });

    databaseRef.doc("sortTypes/ipip_big_five_50")
        .set({
            name: "50-item IPIP version of the Big Five Markers",
            factors: [
                {name: "Agreeableness"},
                {name: "Conscientiousness"},
                {name: "Emotional Stability"},
                {name: "Extraversion"},
                {name: "Intellect / Imagination"}
            ],
            distribution: [3, 5, 6, 7, 8, 7, 6, 5, 3],
            statements: [{
                "statement": "1. Am the life of the party.",
                "factors": [1, 0, 0, 0, 0]
            }, {
                "statement": "2. Feel little concern for others.",
                "factors": [0, -1, 0, 0, 0]
            }, {
                "statement": "3. Am always prepared.",
                "factors": [0, 0, 1, 0, 0]
            }, {
                "statement": "4. Get stressed out easily.",
                "factors": [0, 0, 0, -1, 0]
            }, {
                "statement": "5. Have a rich vocabulary.",
                "factors": [0, 0, 0, 0, 1]
            }, {
                "statement": "6. Don't talk a lot.",
                "factors": [-1, 0, 0, 0, 0]
            }, {
                "statement": "7. Am interested in people.",
                "factors": [0, 1, 0, 0, 0]
            }, {
                "statement": "8. Leave my belongings around.",
                "factors": [0, 0, -1, 0, 0]
            }, {
                "statement": "9. Am relaxed most of the time.",
                "factors": [0, 0, 0, 1, 0]
            }, {
                "statement": "10. Have difficulty understanding abstract ideas.",
                "factors": [0, 0, 0, 0, -1]
            }, {
                "statement": "11. Feel comfortable around people.",
                "factors": [1, 0, 0, 0, 0]
            }, {
                "statement": "12. Insult people.",
                "factors": [0, -1, 0, 0, 0]
            }, {
                "statement": "13. Pay attention to details.",
                "factors": [0, 0, 1, 0, 0]
            }, {
                "statement": "14. Worry about things.",
                "factors": [0, 0, 0, -1, 0]
            }, {
                "statement": "15. Have a vivid imagination.",
                "factors": [0, 0, 0, 0, 1]
            }, {
                "statement": "16. Keep in the background.",
                "factors": [-1, 0, 0, 0, 0]
            }, {
                "statement": "17. Sympathize with others' feelings.",
                "factors": [0, 1, 0, 0, 0]
            }, {
                "statement": "18. Make a mess of things.",
                "factors": [0, 0, -1, 0, 0]
            }, {
                "statement": "19. Seldom feel blue.",
                "factors": [0, 0, 0, 1, 0]
            }, {
                "statement": "20. Am not interested in abstract ideas.",
                "factors": [0, 0, 0, 0, -1]
            }, {
                "statement": "21. Start conversations.",
                "factors": [1, 0, 0, 0, 0]
            }, {
                "statement": "22. Am not interested in other people's problems.",
                "factors": [0, -1, 0, 0, 0]
            }, {
                "statement": "23. Get chores done right away.",
                "factors": [0, 0, 1, 0, 0]
            }, {
                "statement": "24. Am easily disturbed.",
                "factors": [0, 0, 0, -1, 0]
            }, {
                "statement": "25. Have excellent ideas.",
                "factors": [0, 0, 0, 0, 1]
            }, {
                "statement": "26. Have little to say.",
                "factors": [-1, 0, 0, 0, 0]
            }, {
                "statement": "27. Have a soft heart.",
                "factors": [0, 1, 0, 0, 0]
            }, {
                "statement": "28. Often forget to put things back in their proper place.",
                "factors": [0, 0, -1, 0, 0]
            }, {
                "statement": "29. Get upset easily.",
                "factors": [0, 0, 0, -1, 0]
            }, {
                "statement": "30. Do not have a good imagination.",
                "factors": [0, 0, 0, 0, -1]
            }, {
                "statement": "31. Talk to a lot of different people at parties.",
                "factors": [1, 0, 0, 0, 0]
            }, {
                "statement": "32. Am not really interested in others.",
                "factors": [0, -1, 0, 0, 0]
            }, {
                "statement": "33. Like order.",
                "factors": [0, 0, 1, 0, 0]
            }, {
                "statement": "34. Change my mood a lot.",
                "factors": [0, 0, 0, -1, 0]
            }, {
                "statement": "35. Am quick to understand things.",
                "factors": [0, 0, 0, 0, 1]
            }, {
                "statement": "36. Don't like to draw attention to myself.",
                "factors": [-1, 0, 0, 0, 0]
            }, {
                "statement": "37. Take time out for others.",
                "factors": [0, 1, 0, 0, 0]
            }, {
                "statement": "38. Shirk my duties.",
                "factors": [0, 0, -1, 0, 0]
            }, {
                "statement": "39. Have frequent mood swings.",
                "factors": [0, 0, 0, -1, 0]
            }, {
                "statement": "40. Use difficult words.",
                "factors": [0, 0, 0, 0, 1]
            }, {
                "statement": "41. Don't mind being the center of attention.",
                "factors": [1, 0, 0, 0, 0]
            }, {
                "statement": "42. Feel others' emotions.",
                "factors": [0, 1, 0, 0, 0]
            }, {
                "statement": "43. Follow a schedule.",
                "factors": [0, 0, 1, 0, 0]
            }, {
                "statement": "44. Get irritated easily.",
                "factors": [0, 0, 0, -1, 0]
            }, {
                "statement": "45. Spend time reflecting on things.",
                "factors": [0, 0, 0, 0, 1]
            }, {
                "statement": "46. Am quiet around strangers.",
                "factors": [-1, 0, 0, 0, 0]
            }, {
                "statement": "47. Make people feel at ease.",
                "factors": [0, 1, 0, 0, 0]
            }, {
                "statement": "48. Am exacting in my work.",
                "factors": [0, 0, 1, 0, 0]
            }, {
                "statement": "49. Often feel blue.",
                "factors": [0, 0, 0, -1, 0]
            }, {
                "statement": "50. Am full of ideas.",
                "factors": [0, 0, 0, 0, 1]
            }]
        });
}

function pushSortResults() {
    databaseRef.collection("sorts").add({
        sort: databaseRef.doc("sortTypes/california_100"),
        sortedBy: "Ryan Marks",
        sortedOn: Timestamp.fromDate(new Date("2019-11-27")),
        sortClass: "Self Sort",
        note: "No annealing",
        result: {
            0: [
                "36. Is negativistic; tends to undermine and obstruct or sabotage.",
                "37. Is guileful and deceitful, manipulative, opportunistic.",
                "38. Has hostility toward others. (NB.: Basic hostility is intended here; mode of expression is to be indicated by other items.)",
                "61. Creates and exploits dependency in people. (N.B.: Regardless of the techniques employed, e.g., punitiveness, overindulgence. NB.: At the other end of the scale, item implies respecting and encouraging the independence and individuality of others.)",
                "78. Feels cheated and victimized by life."
            ],
            1: [
                "69. Is bothered by anything that can be construed as a demand. (NB.: No implication of the kind of subsequent response is intended here.)",
                "73. Tends to perceive many different contexts in sexual terms; eroticizes situations.",
                "91. Is power-oriented; values power in self or others.",
                "49. Is basically distrustful of people in general; questions their motivations.",
                "52. Behaves in an assertive fashion in interpersonal situations. (NB.: Item 14 reflects underlying submissiveness; this refers to overt behavior.)",
                "63. Judges self and others in conventional terms like \"popularity,\" \"the correct thing to do,\" social pressures, etc.",
                "64. Is socially perceptive of a wide range of interpersonal cues.",
                "99. Is self-dramatizing; histrionic."
            ],
            2: [
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
            3: [
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
            4: [
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
            5: [
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
            6: [
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
            7: [
                "5. Behaves in a giving way toward others. (N.B.: Regardless of the motivation involved.)",
                "33. Is calm, relaxed in manner.",
                "58. Enjoys sensuous experiences(including touch, taste, smell, phys-ical contact).",
                "70. Behaves in an ethically consistent manner; is consistent with own personal standards.",
                "84. Is cheerful. (NB.: Extreme placement toward uncharacteristic end of continuum implies gloominess.)",
                "96. Values own independence and autonomy.",
                "98. Is verbally fluent; can express ideas well.",
                "56. Responds to humor."
            ],
            8: [
                "8. Appears to have a high degree of intellectual capacity. (N.B.: Whether actualized or not. Originality is not necessarily assumed.)",
                "18. Initiates humor.",
                "24. Prides self on being \"objective,\" rational. (Regardless of whether person is really objective or rational.)",
                "39. Thinks and associates to ideas in unusual ways; has unconven-tional thought processes. (Either pathological or creative.)",
                "51. Genuinely values intellectual and cognitive matters. (N.B.: Ability or achievement are not implied here.)"
            ]
        }
    });

    databaseRef.collection("sorts").add({
            sort: databaseRef.doc("sortTypes/california_100"),
            sortedBy: "Ryan Marks",
            sortedOn: Timestamp.fromDate(new Date("2019-11-27")),
            sortClass: "Ideal Sort",
            note: "Annealed",
            result: {
                0: [ //5
                    "30. Gives up and withdraws where possible in the face of frustra-tion and adversity.",
                    "36. Is negativistic; tends to undermine and obstruct or sabotage.",
                    "37. Is guileful and deceitful, manipulative, opportunistic.",
                    "49. Is basically distrustful of people in general; questions their motivations.",
                    "61. Creates and exploits dependency in people. (N.B.: Regardless of the techniques employed, e.g., punitiveness, overindulgence. NB.: At the other end of the scale, item implies respecting and encouraging the independence and individuality of others.)"
                ],
                1: [ //8
                    "12. Tends to be self-defensive.",
                    "13. Is thin-skinned; vulnerable to anything that can be construed as criticism or an interpersonal slight.",
                    "22. Feels a lack of personal meaning in life. (Uncharacteristic end means zest.)",
                    "23. Extrapunitive; tends to transfer or project blame.",
                    "27. Shows condescending behavior in relations with others.",
                    "34. Over-reactive to minor frustrations; irritable.",
                    "38. Has hostility toward others. (NB.: Basic hostility is intended here; mode of expression is to be indicated by other items.)",
                    "85. Is self-pitying (whiny)."
                ],
                2: [ //12
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
                3: [ // 16
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
                4: [//18


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
                5: [//16
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
                6: [ //12
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
                7: [ //8
                    "8. Appears to have a high degree of intellectual capacity. (N.B.: Whether actualized or not. Originality is not necessarily assumed.)",
                    "28. Tends to arouse liking and acceptance in people.",
                    "74. Is consciously unaware of self-concern; feels satisfied with self.",
                    "75. Has a clear-cut, internally consistent personality. (NB.: Amount of information available before sorting is not intended here.)",
                    "77. Appears straightforward, forthright, candid in dealings with others.",
                    "51. Genuinely values intellectual and cognitive matters. (N.B.: Ability or achievement are not implied here.)",
                    "57. Is an interesting, arresting person.",
                    "60. Has insight into own motives and behavior."
                ],
                8: [ //5
                    "2. Is a genuinely dependable and responsible person.",
                    "5. Behaves in a giving way toward others. (N.B.: Regardless of the motivation involved.)",
                    "17. Behaves in a sympathetic or considerate manner.",
                    "35. Has warmth; is compassionate.",
                    "70. Behaves in an ethically consistent manner; is consistent with own personal standards."
                ]
            }
        }
    );

    databaseRef.collection("sorts").add({
        sort: databaseRef.doc("sortTypes/ipip_big_five_50"),
        sortedBy: "Ryan Marks",
        sortedOn: Timestamp.fromDate(new Date("2019-11-30")),
        sortClass: "Self Sort",
        note: "Annealed",
        result: {
            0: [
                "1. Am the life of the party.",
                "2. Feel little concern for others.",
                "12. Insult people."
            ],
            1: [
                "10. Have difficulty understanding abstract ideas.",
                "20. Am not interested in abstract ideas.",
                "26. Have little to say.",
                "44. Get irritated easily.",
                "49. Often feel blue."
            ],
            2: [
                "15. Have a vivid imagination.",
                "29. Get upset easily.",
                "38. Shirk my duties.",
                "39. Have frequent mood swings.",
                "42. Feel others' emotions.",
                "32. Am not really interested in others."
            ],
            3: [
                "3. Am always prepared.",
                "6. Don't talk a lot.",
                "18. Make a mess of things.",
                "22. Am not interested in other people's problems.",
                "34. Change my mood a lot.",
                "43. Follow a schedule.",
                "23. Get chores done right away."
            ],
            4: [
                "11. Feel comfortable around people.",
                "37. Take time out for others.",
                "4. Get stressed out easily.",
                "7. Am interested in people.",
                "14. Worry about things.",
                "31. Talk to a lot of different people at parties.",
                "41. Don't mind being the center of attention.",
                "16. Keep in the background."
            ],
            5: [
                "19. Seldom feel blue.",
                "21. Start conversations.",
                "24. Am easily disturbed.",
                "27. Have a soft heart.",
                "47. Make people feel at ease.",
                "17. Sympathize with others' feelings.",
                "30. Do not have a good imagination."
            ],
            6: [
                "9. Am relaxed most of the time.",
                "45. Spend time reflecting on things.",
                "13. Pay attention to details.",
                "25. Have excellent ideas.",
                "28. Often forget to put things back in their proper place.",
                "8. Leave my belongings around."
            ],
            7: [
                "33. Like order.",
                "36. Don't like to draw attention to myself.",
                "40. Use difficult words.",
                "46. Am quiet around strangers.",
                "48. Am exacting in my work."
            ],
            8: [
                "5. Have a rich vocabulary.",
                "35. Am quick to understand things.",
                "50. Am full of ideas."
            ]
        }
    });

    databaseRef.collection("sorts").add({
        sort: databaseRef.doc("sortTypes/ipip_big_five_50"),
        sortedBy: "Ryan Marks",
        sortedOn: Timestamp.fromDate(new Date("2019-11-30")),
        sortClass: "Ideal Sort",
        note: "Annealed",
        result: {
            0: ["2. Feel little concern for others.", "12. Insult people.", "38. Shirk my duties."],
            1: ["22. Am not interested in other people's problems.", "29. Get upset easily.", "32. Am not really interested in others.", "44. Get irritated easily.", "49. Often feel blue."],
            2: ["4. Get stressed out easily.", "10. Have difficulty understanding abstract ideas.", "14. Worry about things.", "18. Make a mess of things.", "30. Do not have a good imagination.", "39. Have frequent mood swings."],
            3: ["8. Leave my belongings around.", "16. Keep in the background.", "26. Have little to say.", "20. Am not interested in abstract ideas.", "28. Often forget to put things back in their proper place.", "34. Change my mood a lot.", "46. Am quiet around strangers."],
            4: ["3. Am always prepared.", "31. Talk to a lot of different people at parties.", "33. Like order.", "43. Follow a schedule.", "24. Am easily disturbed.", "36. Don't like to draw attention to myself.", "40. Use difficult words.", "6. Don't talk a lot."],
            5: ["19. Seldom feel blue.", "23. Get chores done right away.", "41. Don't mind being the center of attention.", "48. Am exacting in my work.", "1. Am the life of the party.", "7. Am interested in people.", "15. Have a vivid imagination."],
            6: ["9. Am relaxed most of the time.", "11. Feel comfortable around people.", "13. Pay attention to details.", "21. Start conversations.", "27. Have a soft heart.", "47. Make people feel at ease."],
            7: ["17. Sympathize with others' feelings.", "37. Take time out for others.", "45. Spend time reflecting on things.", "5. Have a rich vocabulary.", "50. Am full of ideas."],
            8: ["25. Have excellent ideas.", "35. Am quick to understand things.", "42. Feel others' emotions."]
        }
    });
}

export {pushSortTypes, pushSortResults}
