export interface QAPair {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  category?: 'flood' | 'earthquake' | 'medical' | 'water_food' | 'cyclone' | 'survival';
}

export const DISASTER_QA: QAPair[] = [
  // FLOODS
  {
    id: 'f1',
    question: 'What should I do if flood water is entering my home?',
    keywords: ['flood', 'water', 'home', 'house', 'entering', 'rising', 'inside', 'rain'],
    answer: `[IMMEDIATE ACTION: Turn off all electricity and gas at the main supply and move to high ground.] 
1. Shut off the main power switch immediately to prevent electrocution. Never touch electrical switches if you are already standing in water.
2. Turn off the main gas valve to prevent leaks or fires if the structure is compromised.
3. Move your family, pets, and essential emergency kits to the highest level of the house or onto the roof if necessary.
4. If you have time and it's safe, move valuable electronics, documents, and expensive items to upper floors.
5. Do not go into the basement if it is already flooded, as water can hide dangerous debris or live electrical wires.
6. Check on neighbors, especially the elderly or children, and signal for help if you are trapped.
7. Fill clean containers with fresh water before the supply becomes contaminated.
8. Stay tuned to a battery-powered radio for official evacuation instructions.
[What NOT to do: Do not walk through moving water; 6 inches is enough to knock you down.]
[Emergency number: 112 or 1078 (Disaster helpline)]`,
    category: 'flood'
  },
  {
    id: 'f2',
    question: 'How do I evacuate safely during a flood?',
    keywords: ['evacuate', 'escape', 'flood', 'leave', 'go', 'exit', 'route', 'rain', 'heavy'],
    answer: `[IMMEDIATE ACTION: Follow evacuation orders immediately and move to higher ground.]
1. Listen to local news or disaster management alerts for designated safe routes and evacuation centers.
2. Pack a 'Go-Bag' with 3 days of water, food, first aid, and copies of important identification documents.
3. Wear sturdy, waterproof boots and long-sleeved clothing to protect against debris and infection.
4. If driving, never attempt to cross flooded roads; 'Turn Around, Don't Drown'. Just 12 inches of water can float a car.
5. If walking, use a stick to check the depth and firmness of the ground in front of you. Avoid moving water.
6. Leave a note on your door stating where you have gone so rescuers can track your movement.
7. Help those with mobility issues, the elderly, and children relocate first.
8. Once at a shelter, register your presence so family members can find you.
[What NOT to do: Do not wait until water rises to your door before leaving; roads can become blocked in minutes.]
[Emergency number: 112 or 108 (Ambulance)]`,
    category: 'flood'
  },
  {
    id: 'f3',
    question: 'How do I purify water during a flood?',
    keywords: ['water', 'purify', 'clean', 'drink', 'safe', 'boil', 'contaminated'],
    answer: `[IMMEDIATE ACTION: Assume all tap and flood water is contaminated; boil all water before use.]
1. Boil water at a rolling boil for at least 3 to 5 minutes to kill viruses, bacteria, and parasites.
2. If boiling is impossible, use unscented household bleach. Add 8 drops per gallon (approx 4 liters) and let sit for 30 minutes.
3. Use specialized water purification tablets if available, following the manufacturer's directions exactly.
4. For large debris, filter water through a multi-layered clean cloth or paper filter before purifying.
5. Solar Disinfection (SODIS): Fill clear PET bottles and place them in direct sunlight for 6 hours (2 days if cloudy).
6. Store all purified water in clean, covered containers to prevent re-contamination.
7. Use only purified water for brushing teeth, washing wounds, and preparing baby formula.
8. Distillation: Collect steam from boiling water to remove chemicals and salts.
[What NOT to do: Do not drink flood water or water that has a strange chemical smell, even if boiled.]
[Emergency number: 112 or 104 (Health helpline)]`,
    category: 'flood'
  },
  {
    id: 'f4',
    question: 'What food is safe to eat during floods?',
    keywords: ['food', 'eat', 'safe', 'flood', 'contaminated', 'spoiled'],
    answer: `[IMMEDIATE ACTION: Throw away any food that has come into contact with floodwater.]
1. Discard all perishables like meat, eggs, and leftover cooked food if the power has been out for more than 4 hours.
2. Unopened metal can be saved if cleaned and sanitized in a solution of 1 tablespoon bleach per gallon of water.
3. Check the refrigerator seals; if the inside smells of mold or rotting food, discard everything immediately.
4. Use only bottled or boiled water for cooking food and washing dishes.
5. Prioritize eating high-calorie, shelf-stable foods like biscuits, nuts, and dry cereals.
6. If you have no heat source, eat familiar canned foods directly from the tin after sanitizing the exterior.
7. Avoid eating raw vegetables or fruits if they cannot be washed with purified water.
8. Label and track items in your freezer; full freezers stay safe for about 48 hours if unopened.
[What NOT to do: Do not eat food from "blown" or severely dented cans, even if they were not in flood water.]
[Emergency number: 112 or 1078]`,
    category: 'flood'
  },
  {
    id: 'f5',
    question: 'How do I signal for rescue when trapped?',
    keywords: ['signal', 'rescue', 'help', 'trapped', 'stuck', 'SOS', 'find', 'rain'],
    answer: `[IMMEDIATE ACTION: Make yourself visible from the sky using high-contrast materials.]
1. Use a whistle to alert ground rescuers; its high-pitched sound carries much further than human shouting.
2. During the day, reflect sunlight toward aircraft or boats using a mirror, glass piece, or shiny metal plate.
3. At night, flash a flashlight or phone screen in groups of three flashes—the universal signal for distress.
4. If on a roof, write 'SOS' in large, 10-foot letters using stones, paint, or mud to be visible from helicopters.
5. Hang brightly colored cloths (red, orange, or white) from high structures or windows to attract attention.
6. Wave both arms slowly up and down over your head to signal 'Emergency'; waving one arm might be seen as a hello.
7. Bang rhythmic patterns on metal pipes or walls if you are trapped inside a building to help rescuers locate you.
8. Conserve your voice and energy; sound signals like whistling or banging are more effective for long durations.
[What NOT to do: Do not leave your high-ground position once you have made yourself visible; stay put for rescuers.]
[Emergency number: 112 or 1078]`
  },
  {
    id: 'f6',
    question: 'What are electrical safety rules during floods?',
    keywords: ['electric', 'electrical', 'wire', 'shock', 'power', 'switch'],
    answer: `[IMMEDIATE ACTION: Avoid all water-contact with electrical systems and stay away from downed power lines.]
1. If water is approaching, shut off the main power at the circuit breaker if you can reach it safely.
2. Never touch a circuit breaker or any electric switch while standing in water or if your hands are wet.
3. Stay at least 30 feet away from downed power lines, as they can "charge" the water or ground around them.
4. If you smell ozone or see sparks, evacuate the building immediately as a fire is imminent.
5. Do not use electrical appliances that have been exposed to water until they are dried and tested by a professional.
6. If you are in a car and a power line falls on it, stay inside and do not touch the metal frame.
7. Use battery-operated lights instead of candles to avoid fire hazards in areas with potentially leaky gas lines.
8. If an electrical fire starts, use a Class C fire extinguisher; never use water on an electrical fire.
[What NOT to do: Do not assume a downed power line is dead; it can be re-energized remotely at any time.]
[Emergency number: 101 (Fire) or 112]`
  },
  {
    id: 'f7',
    question: 'I am being swept away by flood water what do I do?',
    keywords: ['swept', 'carried', 'flowing', 'current', 'drowning', 'water'],
    answer: `[IMMEDIATE ACTION: Keep your feet pointed downstream and stay on your back.]
1. Lie on your back with your feet pointing downstream to avoid hitting your head on rocks or debris.
2. Use your feet to push off large obstacles and steer yourself away from dangerous hazards like trees or cars.
3. Do not attempt to stand up in moving water, even if it's shallow; your feet can get trapped under rocks (foot entrapment).
4. Look for a large, stable object like a building or a high bridge and swim diagonally toward it as you float.
5. If you see a tree, try to swim over it rather than getting caught in its branches (strainers), which can trap you under.
6. Take deep breaths when your head is clear and keep your mouth closed when crashing into waves.
7. Signal for help only when you have a moment of stability; focus on staying afloat first.
8. Try to grab onto a floating object like a cooler, plank, or tire to increase your buoyancy and rest your muscles.
[What NOT to do: Do not fight the current head-on; swim at a 45-degree angle toward the shore or a solid structure.]
[Emergency number: 112 or 108]`
  },
  {
    id: 'f8',
    question: 'How do I help a drowning person safely?',
    keywords: ['drowning', 'person', 'help', 'rescue', 'water', 'pull'],
    answer: `[IMMEDIATE ACTION: Reach or throw, but do not jump in unless you are a trained lifeguard.]
1. Use a long object like a pole, branch, or towel to 'reach' the person from the safety of the bank.
2. If they are too far to reach, 'throw' a floating object like a lifebuoy, plastic can, or foam board.
3. Call 108 immediately while attempting the rescue so professional help is on the way.
4. Encourage the person to stay calm and kick their legs while you pull them in with the reaching object.
5. If you must enter the water, approach them from behind so they cannot grab you and pull you under in their panic.
6. Once on land, check if they are breathing. If not, begin CPR starting with 30 chest compressions.
7. Keep the person warm to prevent hypothermia, as even warm-looking floodwater can drain body heat.
8. Check for injuries and keep the person still if you suspect they hit their head or spine while in the water.
[What NOT to do: Do not let the person pull you under; it is better to lose one person than for the rescuer to drown too.]
[Emergency number: 108 (Ambulance) or 112]`
  },
  {
    id: 'f9',
    question: 'How do I keep children safe during floods?',
    keywords: ['child', 'children', 'kids', 'baby', 'infant', 'flood', 'safe'],
    answer: `[IMMEDIATE ACTION: Never leave children unattended and keep them away from any standing water.]
1. Explain the situation in calm, simple terms to reduce their fear and ensure they follow instructions.
2. Ensure every child is wearing a life vest or has a flotation device if water is rising near the home.
3. Keep children away from floodwaters, which can contain sewage, chemicals, and electrical hazards.
4. If you have an infant, continue breastfeeding if possible, as it provides nutrition and sterile fluids.
5. Pack a specific child-focused emergency kit with comfort items, toys, formula, and specialized medications.
6. Monitor children for signs of trauma or extreme anxiety; provide constant physical comfort and reassurance.
7. Ensure they know not to play with mud or debris after the water recedes, as it may hide sharp objects or snakes.
8. Keep children's hands washed frequently with purified water to prevent waterborne illnesses like cholera.
[What NOT to do: Do not let children play in floodwater; just a few inches can sweep a small child away.]
[Emergency number: 1098 (Child helpline) or 112]`,
    category: 'flood'
  },
  {
    id: 'f10',
    question: 'What should I pack in an emergency flood kit?',
    keywords: ['pack', 'kit', 'bag', 'emergency', 'supplies', 'take', 'bring'],
    answer: `[IMMEDIATE ACTION: Pack a waterproof Go-Bag with essentials for at least 72 hours.]
1. Water: 3-4 liters per person per day for drinking and basic sanitation.
2. Food: Non-perishable, high-energy items like protein bars, canned goods (with a manual opener), and nuts.
3. Medical: A first-aid kit including bandages, antiseptics, and a 14-day supply of personal medications.
4. Documents: Insurance papers, ID cards, and bank details in a sealed, waterproof, floating pouch.
5. Tools: A battery-powered or hand-crank radio, extra batteries, a loud whistle, and a multi-tool.
6. Lighting: LED flashlights and waterproof matches or a lighter.
7. Hygiene: Soap, hand sanitizer, feminine hygiene products, and wet wipes.
8. Clothing: Sturdy boots, a raincoat, and a warm blanket for every family member.
[What NOT to do: Do not pack heavy or bulky items that will slow you down during an emergency evacuation.]
[Emergency number: 112 or 1078]`
  },
  {
    id: 'f11',
    question: 'How do I stay safe on a rooftop waiting for rescue?',
    keywords: ['roof', 'rooftop', 'waiting', 'rescue', 'stuck', 'top'],
    answer: `[IMMEDIATE ACTION: Stay on the roof ridge and signal clearly for air or boat rescue.]
1. Move to the highest, most structurally stable part of the roof. Avoid staying near chimneys or steep edges.
2. Tie yourself and your family members to a stable structure using a long rope, allowing for some movement.
3. Keep consistent signaling: wave a bright cloth, flash a light, or use a mirror at passing groups.
4. Stay warm by huddling together and using blankets; exposure to wind can cause hypothermia even in humid weather.
5. Ration your water and food strictly; you may be there for 24-48 hours before a boat reaches you.
6. Watch for debris or large floating objects hitting the house; be ready to move if the structure feels weak.
7. Keep a whistle nearby and use it whenever you hear an engine or voices in the distance.
8. If the water continues to rise, stay on the roof surface; never get trapped inside an attic without a way out.
[What NOT to do: Do not jump into the water to reach a passing boat; wait for them to come to you.]
[Emergency number: 112 or 1078]`
  },
  {
    id: 'f12',
    question: 'Is it safe to return home after a flood?',
    keywords: ['return', 'home', 'after', 'flood', 'safe', 'back', 're-enter'],
    answer: `[IMMEDIATE ACTION: Do not enter your home until local authorities declare the area safe.]
1. Inspect the exterior for structural damage, sagging roofs, or foundation cracks before stepping inside.
2. Check for gas leaks: if you smell rotten eggs, do not enter; call your gas provider immediately.
3. Do not turn on the electricity; have an electrician inspect the wiring and ensure it is completely dry first.
4. Photograph all damage for insurance claims before you start cleaning or removing debris.
5. Wear protective gear—gloves, masks (N95), and rubber boots—to prevent contact with mold and bacteria.
6. Throw away all food, medicines, and cosmetics that touched floodwater, regardless of the packaging.
7. Wash and disinfect all hard surfaces with a solution of 1 cup bleach to 5 gallons of water.
8. Ventilate the house by opening all windows and doors to dry out the interior and prevent mold growth.
[What NOT to do: Do not use your plumbing or flush toilets until you are sure the sewer lines are clear.]
[Emergency number: 112 or 1078]`
  },
  {
    id: 'f13',
    question: 'How do I treat a snake bite during floods?',
    keywords: ['snake', 'bite', 'venom', 'flood', 'treatment', 'bitten'],
    answer: `[IMMEDIATE ACTION: Keep the bitten limb completely still and call for an ambulance immediately.]
1. Stay calm; a racing heart spreads venom faster through your body. Sit or lie down and avoid movement.
2. Keep the bite site at or slightly below the level of your heart to slow the venom's travel.
3. Remove rings, watches, or tight clothing near the bite, as the area will likely swell significantly.
4. Clean the wound gently with soap and water if available, but do not scrub or press hard.
5. Apply a firm (but not tight) bandage from the bite upward toward the heart to slow lymph drainage.
6. Note the exact time of the bite and, if possible, take a photo of the snake or memorize its color and pattern.
7. Do not leave the victim alone; monitor their breathing and heart rate until help arrives.
8. If the person collapses or stops breathing, begin CPR compressions immediately.
[What NOT to do: Do NOT cut the wound, do NOT suck out the venom, and do NOT apply ice or a tight tourniquet.]
[Emergency number: 108 (Ambulance) or 112]`
  },
  {
    id: 'f14',
    question: 'What diseases can I get from flood water?',
    keywords: ['disease', 'infection', 'illness', 'flood', 'water', 'contaminated', 'cholera'],
    answer: `[IMMEDIATE ACTION: Prevent infection by washing hands and drinking only purified water.]
1. Cholera: Watch for severe watery diarrhea and vomiting; treat immediately with ORS and see a doctor.
2. Typhoid: Symptoms include high fever, weakness, and stomach pain; ensure all food is thoroughly cooked.
3. Leptospirosis: Caused by animal urine in water; avoid walking barefoot in mud or floodwater.
4. Skin Infections: Treat every tiny cut or scratch with antiseptic and keep it covered with a waterproof bandage.
5. Hepatitis A: A liver infection caused by contaminated food/water; maintain strict hygiene in camps.
6. Dengue/Malaria: Stagnant water after floods breeds mosquitoes; use nets and repellent regularly.
7. Eye/Ear Infections: Avoid getting floodwater in your eyes or ears; use clean water for hygiene.
8. Gastroenteritis: Standard 'stomach flu' from bacteria; wash all utensils with boiled or bleached water.
[What NOT to do: Do not ignore a fever or persistent diarrhea; dehydration kills faster than the infection.]
[Emergency number: 112 or 104 (Health helpline)]`
  },
  {
    id: 'f15',
    question: 'How do I build a temporary shelter after floods?',
    keywords: ['shelter', 'temporary', 'build', 'flood', 'homeless', 'stay'],
    answer: `[IMMEDIATE ACTION: Find high, dry ground away from slopes and standing water.]
1. Use available materials like plastic tarps, heavy polythene sheets, or even bamboo to create a frame.
2. Dig a small trench around your shelter to drain away rainwater and keep the interior floor dry.
3. Elevate your sleeping area using wooden pallets, stones, or thick layers of dry grass to avoid ground moisture.
4. Ensure the shelter has enough ventilation to prevent carbon monoxide poisoning if using a stove/candle.
5. Anchor the corners deeply with heavy stones or stakes to prevent the wind from blowing the cover away.
6. If using a tarp, slope it at a sharp angle so that rain runs off immediately rather than pooling on top.
7. Keep a cleared area of at least 10 feet around the shelter to spot snakes or insects approaching.
8. Share resources with neighbors to build a larger, more stable communal shelter if materials are scarce.
[What NOT to do: Do not build a shelter under large, leaning trees or in low-lying dried-up stream beds.]
[Emergency number: 112 or 1078]`
  }
];

DISASTER_QA.push(
  // EARTHQUAKES
  {
    id: 'e1',
    question: 'What is drop cover and hold on technique?',
    keywords: ['drop', 'cover', 'hold', 'earthquake', 'technique', 'shake'],
    answer: `[IMMEDIATE ACTION: Drop to your hands and knees, cover your head, and hold onto a sturdy object.]
1. Drop: Get down on your hands and knees before the earthquake knocks you down; this position protects you from falling objects.
2. Cover: Take cover under a sturdy desk or table; if none is nearby, crawl to an interior corner and cover your head with your arms.
3. Hold On: Grip the table leg with one hand and stay under cover until the shaking stops; be prepared to move with the table.
4. If you are in bed: Stay there and cover your head with a pillow; you are less likely to be injured than if you try to move.
5. If you are outdoors: Move to an open area away from buildings, streetlights, and utility wires; stay low until the shaking stops.
6. If you are in a wheelchair: Lock your wheels and protect your head and neck with your arms or a sturdy bag.
7. Avoid elevators: Never use an elevator during or immediately after an earthquake; you could become trapped if the power fails.
8. Stay put: Most injuries occur when people inside buildings attempt to move to a different location or leave during the shaking.
[What NOT to do: Do not stand in a doorway; modern doors are not stronger than the rest of the house and provide no protection.]
[Emergency number: 112 or 108]`,
    category: 'earthquake'
  },
  {
    id: 'e2',
    question: 'What do I do immediately after an earthquake stops?',
    keywords: ['after', 'earthquake', 'stops', 'shaking', 'over', 'what'],
    answer: `[IMMEDIATE ACTION: Check yourself for injuries and then safely evacuate to an open area.]
1. Check yourself and those around you for injuries; provide first aid for minor cuts and bruises immediately.
2. Smell for gas: if you smell a rotten-egg odor, open all windows, leave the building, and turn off the main gas valve.
3. Check for small fires and extinguish them if possible; earthquakes often cause electrical shorts or gas leaks that lead to fire.
4. Expect aftershocks: these are smaller quakes that follow the main one; stay prepared to 'Drop, Cover, and Hold On'.
5. Evacuate using stairs: never use elevators; check the stairs for structural stability before putting your full weight on them.
6. Once outside, move to an open space away from damaged buildings, glass, and leaning trees or power poles.
7. Turn off the main water and electricity if you suspect the pipes are broken or wires are damaged to prevent flooding or fire.
8. Listen to a battery-powered radio for official damage reports and instructions from local emergency management.
[What NOT to do: Do not use matches or lighters until you are 100% sure there are no gas leaks in the vicinity.]
[Emergency number: 112 or 101 (Fire)]`,
    category: 'earthquake'
  },
  {
    id: 'e3',
    question: 'I smell gas after an earthquake what do I do?',
    keywords: ['gas', 'smell', 'leak', 'earthquake', 'pipe', 'explosion'],
    answer: `[IMMEDIATE ACTION: Leave the building immediately and do not use any electrical switches or phones inside.]
1. If you smell gas or hear a hissing sound, open all windows and doors to ventilate the area as you move toward the exit.
2. Do not flip any light switches, use your phone, or plug/unplug any appliances; even a tiny spark can cause a massive explosion.
3. Turn off the main gas shutoff valve (usually located near the gas meter) using a wrench if it is safe to do so.
4. Warn your neighbors as you evacuate to ensure they also leave their homes and avoid using ignition sources.
5. Once you are at a safe distance (at least 100 meters away), call the gas emergency service or 101 (Fire Brigade).
6. Stay outside and do not re-enter the building for any reason until the gas company or fire department declares it safe.
7. Avoid smoking or using lighters anywhere near the suspected leak site.
8. If you have been exposed to gas and feel dizzy or nauseous, seek fresh air and medical attention immediately.
[What NOT to do: Do not try to find the leak yourself; gas is highly explosive and requires professional equipment to handle.]
[Emergency number: 101 (Fire) or 112]`,
    category: 'earthquake'
  },
  {
    id: 'e4',
    question: 'I am trapped under rubble after earthquake what do I do?',
    keywords: ['trapped', 'rubble', 'debris', 'stuck', 'buried', 'earthquake'],
    answer: `[IMMEDIATE ACTION: Protect your lungs by covering your mouth with a piece of clothing or handkerchief.]
1. Avoid unnecessary movement: kicking or thrashing will stir up dangerous dust and may cause further collapse of the debris.
2. Tap on a pipe or wall so rescuers can hear your location; sound travels through solid structures better than air.
3. If you have a whistle, use it; it requires less energy than shouting and its high frequency is easier for rescue teams to detect.
4. Shout only as a last resort: shouting causes you to inhale more dust and will exhaust you quickly.
5. If you have a cell phone and a signal, text your exact location to 112 or a family member to conserve battery.
6. Stay calm and focus on rhythmic breathing to conserve oxygen; rescue often takes several hours or even days.
7. If you see a light from rescuers, use a flashlight or reflect it back using a mirror to pinpoint your position.
8. If you are with others, encourage them and take turns signaling to ensure someone is always alert.
[What NOT to do: Do not light a match or lighter; there may be leaking gas pipes trapped under the rubble with you.]
[Emergency number: 112 or 1078 (Disaster helpline)]`,
    category: 'earthquake'
  },
  {
    id: 'e5',
    question: 'How do I prepare for aftershocks?',
    keywords: ['aftershock', 'prepare', 'another', 'shake', 'again', 'earthquake'],
    answer: `[IMMEDIATE ACTION: Stay in a safe, open area and be ready to 'Drop, Cover, and Hold On' at any moment.]
1. Recognize that aftershocks are common and can occur minutes, hours, or even days after the initial earthquake.
2. Secure your immediate environment: move away from tall furniture, glass windows, and hanging objects that may have loosened.
3. Keep your emergency 'Go-Bag' with you at all times; do not leave it inside a building you have already evacuated.
4. If you must re-enter a building to retrieve essentials, do it very quickly and have someone wait outside to alert you.
5. Wear sturdy shoes: aftershocks can cause more glass to break and debris to fall on paths that were previously clear.
6. Check your emergency radio frequently for updates on the severity of aftershocks and seismic activity.
7. Re-check your gas, water, and electrical shutoffs after any significant aftershock to ensure no new leaks have started.
8. Stay calm and help children or the elderly manage their anxiety, as multiple tremors can be psychologically exhausting.
[What NOT to do: Do not assume the danger is over because the initial shaking stopped; aftershocks can cause already weakened buildings to collapse.]
[Emergency number: 112 or 1078]`,
    category: 'earthquake'
  },
  {
    id: 'e6',
    question: 'How do I exit a building safely during earthquake?',
    keywords: ['exit', 'building', 'leave', 'escape', 'earthquake', 'stairs', 'door'],
    answer: `[IMMEDIATE ACTION: Wait until the shaking stops before attempting to exit, then use the stairs.]
1. Stay inside during the shaking: most injuries occur when people try to leave and are hit by falling glass or bricks.
2. Once the shaking stops, look for a clear path to the exit. Avoid areas with fallen cabinets or shattered glass.
3. Never use an elevator: power outages are common after quakes and you could be trapped for days.
4. Check the stairway for structural damage; if stairs look cracked or detached from the wall, find an alternative exit.
5. Exit toward an open area: once outside, move as far from the building as possible to avoid 'curtain wall' collapses.
6. Protect your head and neck with a bag or your arms as you move through hallways and doorways.
7. If the main exit is blocked, look for ground-floor windows; clear any jagged glass with a heavy object before climbing through.
8. Cooperate with building wardens or emergency personnel and move to the designated assembly point.
[What NOT to do: Do not run blindly; panic causes more injuries than the earthquake itself.]
[Emergency number: 112 or 101]`,
    category: 'earthquake'
  },
  {
    id: 'e7',
    question: 'What do I do if I am in a car during earthquake?',
    keywords: ['car', 'vehicle', 'driving', 'earthquake', 'road', 'stop'],
    answer: `[IMMEDIATE ACTION: Pull over to a clear area, set the parking brake, and stay inside the vehicle.]
1. Slow down and look for an area away from bridges, overpasses, utility poles, and large trees that could fall on you.
2. Stop the car and stay inside with your seatbelt fastened until the shaking completely stops.
3. The car's suspension system acts as a shock absorber and the metal frame provides a measure of protection from debris.
4. If a power line falls on your car, do not exit; stay inside and wait for emergency responders to de-energize the line.
5. Listen to the car radio for emergency broadcasts and information about road closures or coastal tsunami warnings.
6. Avoid driving over bridges or ramps that may have been structurally weakened by the tremor.
7. If you must exit the car, watch for other drivers who may be panicking and not following traffic rules.
8. If the earthquake causes a fire near your car, evacuate to a safe distance while watching for downed wires.
[What NOT to do: Do not stop under an overpass or next to tall buildings which are high-risk zones for falling debris.]
[Emergency number: 112 or 100 (Police)]`,
    category: 'earthquake'
  },
  {
    id: 'e8',
    question: 'How do I check if a building is safe after earthquake?',
    keywords: ['building', 'safe', 'check', 'damage', 'crack', 'structure'],
    answer: `[IMMEDIATE ACTION: Assume all damaged buildings are unsafe until inspected by a professional engineer.]
1. Look for 'X' or 'V' shaped cracks on the exterior walls, which indicate significant structural stress.
2. Check if the building is leaning or if the foundation has shifted or cracked significantly.
3. Look into the interior: are the ceilings sagging or have large pieces of plaster fallen? These are signs of a weak structure.
4. Check the doors: if multiple doors are stuck and won't open or close, the entire frame of the building may have warped.
5. Sniff for gas and listen for hissing; check the electrical panel for the smell of burnt plastic.
6. Examine the stairs: look for gaps between the steps and the supporting wall.
7. Walk around the perimeter and look for 'falling hazards' like loose AC units, bricks, or chimneys that might fall in an aftershock.
8. If there is any doubt, stay outside in a tent or temporary shelter until a government safety tag (Green/Yellow/Red) is issued.
[What NOT to do: Do not enter a building to retrieve belongings if you see large cracks or hear creaking sounds.]
[Emergency number: 112 or 1078]`,
    category: 'earthquake'
  },
  {
    id: 'e9',
    question: 'There might be a tsunami after the earthquake what do I do?',
    keywords: ['tsunami', 'earthquake', 'coastal', 'wave', 'sea', 'ocean', 'run'],
    answer: `[IMMEDIATE ACTION: If you are near the coast and feel a strong shake, move inland or to high ground immediately.]
1. Don't wait for a warning: if the earthquake lasts more than 20 seconds and you are near the sea, move at least 2 miles inland.
2. If you see the water receding rapidly from the shore, it is a definitive sign that a large wave is approaching.
3. Move to an elevation of at least 100 feet (30 meters) above sea level. Look for high hills or specialized tsunami towers.
4. If you cannot get inland, move to the 4th floor or higher of a reinforced concrete building.
5. Stay away from the coast until local authorities give the 'All Clear'; a tsunami is a series of waves and the biggest may not be the first.
6. If you are on a boat, move out to deep water (at least 100 meters deep) where the wave is less dangerous.
7. Grab your emergency kit and move on foot if traffic is jammed; speed is more important than comfort.
8. Tune your radio to local emergency frequencies periodically for updates on wave arrivals and safe zones.
[What NOT to do: Do not go down to the beach to 'watch' for the wave; if you can see the wave, you are too close to escape it.]
[Emergency number: 112 or 1078]`,
    category: 'earthquake'
  },
  {
    id: 'e10',
    question: 'How do I help an injured person after earthquake?',
    keywords: ['injured', 'help', 'hurt', 'earthquake', 'first aid', 'wound'],
    answer: `[IMMEDIATE ACTION: Ensure the area is safe from falling debris before approaching the injured person.]
1. Check for life-threatening conditions: is the person breathing, and do they have severe, spurting bleeding?
2. Control bleeding: apply firm, direct pressure to any open wounds using a clean cloth or bandage.
3. If the person is not breathing, start CPR compressions (100-120 per minute) in the center of the chest.
4. Do not move people who may have a spinal injury (neck or back pain) unless they are in immediate danger from fire or collapse.
5. Treat for shock: lay the person flat, ideally with their feet elevated, and keep them warm with a blanket.
6. Splint suspected broken bones using straight wood or cardboard to prevent movement and reduce pain.
7. Keep the victim calm and talk to them; psychological support is vital in deep trauma situations.
8. Note their condition and symptoms to provide a detailed report to paramedics when they arrive.
[What NOT to do: Do not give an unconscious person food or water, as it can cause choking (aspiration).]
[Emergency number: 108 (Ambulance) or 112]`,
    category: 'earthquake'
  }
);

DISASTER_QA.push(
  // MEDICAL EMERGENCIES
  {
    id: 'm1',
    question: 'Someone is bleeding heavily from a limb what do I do?',
    keywords: ['bleeding', 'blood', 'limb', 'leg', 'arm', 'cut', 'wound', 'hemorrhage'],
    answer: `[IMMEDIATE ACTION: Apply firm, direct pressure to the wound using a clean cloth or your hands.]
1. Find the source of the bleeding and apply direct pressure immediately with the cleanest material available.
2. If the bleeding doesn't stop with direct pressure, apply a tourniquet 2-3 inches above the wound (between the wound and the heart).
3. Tighten the tourniquet until the bleeding stops completely. Note the exact time you applied it.
4. Keep the injured limb elevated above the level of the heart if possible to reduce blood flow.
5. Do not remove the original bandage if it becomes soaked; add more layers on top to avoid disturbing the clot.
6. Check for signs of shock: pale skin, rapid heartbeat, or confusion. Lay the person flat and keep them warm.
7. If an object is embedded in the wound, do not remove it; pad around it and apply pressure to the surrounding area.
8. Stay with the victim and keep them calm until an ambulance arrives; keep talking to them to monitor their consciousness.
[What NOT to do: Do not use a tourniquet for minor bleeding or on the neck or torso. Do not loosen it once applied.]
[Emergency number: 108 (Ambulance) or 112]`,
    category: 'medical'
  },
  {
    id: 'm2',
    question: 'How do I perform CPR on an adult?',
    keywords: ['CPR', 'resuscitation', 'breathing', 'unconscious', 'heart', 'stop'],
    answer: `[IMMEDIATE ACTION: Begin chest compressions immediately: push hard and fast in the center of the chest.]
1. Check for responsiveness: tap the person and shout. If no response, check for breathing for no more than 10 seconds.
2. Call 108 immediately or ask someone else to call and fetch an AED if available.
3. Place the heel of one hand in the center of the chest and the other hand on top, interlacing fingers.
4. Push down at least 2 inches (5cm) at a rate of 100-120 compressions per minute (to the beat of 'Stayin' Alive').
5. Allow the chest to fully recoil between compressions; do not lean on the chest.
6. If trained, give 2 rescue breaths after every 30 compressions; if not trained, perform hands-only CPR.
7. Continue CPR until the person starts breathing, an AED is ready, or professional help takes over.
8. If the person begins to breathe, place them in the 'recovery position' on their side to keep the airway clear.
[What NOT to do: Do not stop compressions for more than 10 seconds. Do not push on the ribs or stomach.]
[Emergency number: 108 (Ambulance) or 112]`,
    category: 'medical'
  },
  {
    id: 'm3',
    question: 'Someone is choking and cannot breathe what do I do?',
    keywords: ['choking', 'choke', 'breathe', 'airway', 'blocked', 'stuck', 'Heimlich'],
    answer: `[IMMEDIATE ACTION: Perform the Heimlich maneuver (abdominal thrusts) immediately.]
1. Stand behind the person and wrap your arms around their waist. Make a fist with one hand.
2. Place the thumb side of your fist just above the person's navel but below the ribs.
3. Grasp your fist with your other hand and pull inward and upward with a quick, forceful thrust.
4. Repeat these thrusts until the object is forced out or the person becomes unconscious.
5. If the person becomes unconscious, lower them to the ground and begin CPR starting with chest compressions.
6. Check the mouth for the object periodically; only remove it if you can see it clearly (no blind finger sweeps).
7. For a pregnant woman or a very large person, perform thrusts on the center of the chest instead of the abdomen.
8. Even if the object comes out, the person should see a doctor to check for internal injuries from the thrusts.
[What NOT to do: Do not try to slap the person on the back if they can still cough or speak; let them cough it out.]
[Emergency number: 108 (Ambulance) or 112]`,
    category: 'medical'
  },
  {
    id: 'm4',
    question: 'How do I treat a severe burn from fire or hot liquid?',
    keywords: ['burn', 'fire', 'scald', 'hot', 'heat', 'skin', 'blister'],
    answer: `[IMMEDIATE ACTION: Cool the burn immediately under cool (not cold) running water for 20 minutes.]
1. Remove the heat source: stop the fire or move the person away from the hot liquid or steam.
2. Cool the area with running tap water; do not use ice, butter, or ointments, as they trap heat and damage tissue.
3. Remove any jewelry or tight clothing near the burn area before it begins to swell.
4. Cover the burn loosely with a clean, sterile non-stick bandage or clear plastic wrap to prevent infection.
5. If the person's clothing is stuck to the burn, do not pull it off; cut around it and leave the stuck part for doctors.
6. Do not pop any blisters, as they are a natural barrier against infection.
7. Treat for shock if the burn is larger than the person's palm: lay them flat and elevate legs if possible.
8. Monitor the person for difficulty breathing if the burn is on the face, neck, or chest.
[What NOT to do: Do not apply toothpaste, oil, or ice to a burn; these are common myths that worsen the injury.]
[Emergency number: 108 or 101]`,
    category: 'medical'
  },
  {
    id: 'm5',
    question: 'Someone has fainted and is unconscious what do I do?',
    keywords: ['fainted', 'unconscious', 'passed out', 'collapsed', 'blackout'],
    answer: `[IMMEDIATE ACTION: Lay the person flat on their back and elevate their legs about 12 inches.]
1. Check for breathing and a pulse; if they are not breathing, begin CPR immediately.
2. Loosen any tight clothing around their neck, chest, and waist to help them breathe more easily.
3. If they are breathing, turn them onto their side (the recovery position) to prevent them from choking on vomit.
4. Do not let them get up immediately after regaining consciousness; keep them lying down for at least 10 minutes.
5. Check for any injuries they may have sustained while falling, especially head or neck injuries.
6. If the person has a history of diabetes, they may have low blood sugar; seek medical help immediately.
7. Ventilate the area: move onlookers away and ensure the person has plenty of fresh air.
8. If the person does not regain consciousness within one minute, call 108 for an ambulance.
[What NOT to do: Do not splash water on their face or try to give them something to drink while they are unconscious.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm6',
    question: 'How do I treat a suspected broken bone or fracture?',
    keywords: ['broken', 'bone', 'fracture', 'snap', 'crack', 'limb'],
    answer: `[IMMEDIATE ACTION: Immobilize the injured area and do not try to realign the bone.]
1. Stop any bleeding by applying direct pressure with a clean cloth.
2. Splint the injury: use a rigid object like a board, rolled-up newspaper, or umbrella and tie it to the limb.
3. Pad the splint with soft cloth or towels to prevent skin damage and increase comfort.
4. Apply an ice pack (wrapped in a cloth) to the area to reduce swelling and manage pain.
5. Do not move the person if you suspect a fracture in the head, neck, back, or hip.
6. Check for circulation beyond the injury site: ensure the fingers or toes aren't turning blue or becoming cold.
7. Elevate the injured area if possible to further reduce swelling while waiting for help.
8. If the bone has pierced the skin (compound fracture), do not try to push it back in; cover it with a sterile dressing.
[What NOT to do: Do not test the 'strength' of a limb by asking the person to walk or put weight on it.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm7',
    question: 'Someone is having a heart attack what are the signs and steps?',
    keywords: ['heart attack', 'chest pain', 'cardiac', 'chest', 'tightness'],
    answer: `[IMMEDIATE ACTION: Call 108 immediately and have the person sit down and rest.]
1. Recognize signs: heavy pressure or squeezing in the chest, pain spreading to arms/neck/jaw, and shortness of breath.
2. Have the person sit in a comfortable position, such as on the floor with their back against a wall and knees bent.
3. If the person is not allergic and it's available, have them chew and swallow one adult aspirin (325mg).
4. Loosen any tight clothing around the neck and waist to help them breathe more easily.
5. Stay with the person and keep them calm; anxiety can increase the strain on the heart.
6. Monitor their breathing and pulse; if they lose consciousness and stop breathing, begin CPR immediately.
7. Ask if they have heart medication like nitroglycerin and help them take it if they are conscious.
8. Note the exact time the symptoms started to provide a detailed report to the emergency team.
[What NOT to do: Do not let the person drive themselves to the hospital. Do not wait for symptoms to 'pass'.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm8',
    question: 'How do I recognize and treat a stroke?',
    keywords: ['stroke', 'paralysis', 'FAST', 'face', 'speech', 'brain'],
    answer: `[IMMEDIATE ACTION: Use the FAST test and call 108 immediately if any sign is present.]
1. F (Face): Ask the person to smile. Does one side of the face droop?
2. A (Arms): Ask the person to raise both arms. Does one arm drift downward or is it unable to move?
3. S (Speech): Ask the person to repeat a simple phrase. Is their speech slurred or strange?
4. T (Time): If any of these signs are present, call 108 immediately every second counts for brain tissue.
5. While waiting for the ambulance, lay the person on their side if they are vomiting or having trouble breathing.
6. Do not give the person any food, water, or medication (even aspirin), as it may cause choking or worsen a bleed.
7. Keep the person warm and monitor their breathing continuously.
8. Note the exact time the first symptom appeared to help doctors decide the best treatment (clot-busting drugs).
[What NOT to do: Do not wait for the symptoms to improve; 'mini-strokes' (TIAs) carry a high risk of a major stroke.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm9',
    question: 'Someone has an object stuck in their eye what do I do?',
    keywords: ['eye', 'stuck', 'object', 'dust', 'glass', 'vision'],
    answer: `[IMMEDIATE ACTION: Do not rub the eye; this can cause permanent scratching of the cornea.]
1. If it's a small particle like dust, try blinking rapidly to see if tears can wash it out naturally.
2. Flush the eye with clean, lukewarm water or saline for 15 minutes. Use a small cup or a gentle tap.
3. If an object is embedded in the eye (like metal or glass), do not attempt to remove it.
4. Cover the injured eye with a rigid eye shield or a paper cup taped over the area; do not apply pressure.
5. Cover the other (healthy) eye as well; eyes move together, and this will prevent the injured eye from moving.
6. If a chemical has splashed into the eye, flush immediately for 20 minutes and call 108.
7. Keep the person calm and discourage them from touching the eye area under any circumstances.
8. Seek immediate medical attention at an eye clinic or emergency room.
[What NOT to do: Do not use tweezers, cotton swabs, or any solid tool to try and pick an object out of the eye.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm10',
    question: 'How do I treat a deep cut or puncture wound?',
    keywords: ['cut', 'puncture', 'wound', 'deep', 'nail', 'knife', 'stab'],
    answer: `[IMMEDIATE ACTION: Call for medical help if the wound is very deep or has an object embedded.]
1. Control any severe bleeding by applying direct pressure with a clean, dry cloth.
2. If an object (like a nail or knife) is still in the wound, leave it there; removing it can cause massive bleeding.
3. Pad around the embedded object and secure it with bandages to prevent it from moving during transport.
4. If the wound is clean and superficial, wash it with soap and warm water for at least 5 minutes.
5. Apply an antibiotic ointment if available and cover with a sterile, non-stick dressing.
6. Check for signs of infection over the next few days: redness, increased pain, pus, or fever.
7. Ask the person when they last had a tetanus shot; deep puncture wounds carry a high risk of tetanus.
8. If the wound was caused by an animal or human bite, seek immediate professional medical care.
[What NOT to do: Do not use hydrogen peroxide or alcohol directly in a deep wound, as it can damage tissue.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm11',
    question: 'Someone is having a seizure what do I do?',
    keywords: ['seizure', 'fit', 'convulsion', 'epilepsy', 'shaking'],
    answer: `[IMMEDIATE ACTION: Clear the area of hard or sharp objects and cushion the person's head.]
1. Stay calm and track the time; most seizures last between 30 seconds and 2 minutes.
2. Gently roll the person onto their side to keep their airway clear and prevent them from choking on saliva.
3. Loosen any tight clothing around their neck, such as a tie or collar, to help their breathing.
4. Do not restrain the person; let the seizure run its course without trying to stop their movements.
5. Stay with the person until the seizure ends and they are fully awake and alert again.
6. Once it's over, the person may be confused or sleepy; talk to them calmly and let them rest on their side.
7. Call 108 if the seizure lasts more than 5 minutes, if they have another seizure immediately, or if they are pregnant.
8. Check for any medical ID bracelets that might list history or specific emergency instructions.
[What NOT to do: Do NOT put anything in the person's mouth; they will not swallow their tongue, but you may break their teeth.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm12',
    question: 'How do I treat heatstroke or extreme heat exhaustion?',
    keywords: ['heat', 'heatstroke', 'exhaustion', 'sun', 'fever', 'dehydration'],
    answer: `[IMMEDIATE ACTION: Move the person to a cool, shaded area and call 108 immediately.]
1. Heatstroke is a life-threatening emergency where the body temperature rises above 104°F (40°C).
2. Cool the person rapidly: use a garden hose, wet towels, or place them in a cool bath if possible.
3. Apply ice packs to the armpits, groin, and neck, as these areas have large blood vessels close to the skin.
4. If the person is conscious, give them frequent small sips of cool water or an electrolyte drink (ORS).
5. Remove any unnecessary clothing and fan the person vigorously to increase evaporative cooling.
6. Monitor for signs of confusion, seizures, or loss of consciousness; be ready to perform CPR if they stop breathing.
7. If it's only heat exhaustion (they are sweating heavily), have them rest in the shade and drink plenty of fluids.
8. Avoid giving drinks containing caffeine or alcohol, as they worsen dehydration.
[What NOT to do: Do not ignore 'dry skin' on a hot person; if they stop sweating, it is a sign of severe heatstroke.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  }
);

DISASTER_QA.push(
  // MEDICAL BATCH 2
  {
    id: 'm13',
    question: 'Someone has swallowed a poisonous substance what do I do?',
    keywords: ['poison', 'swallowed', 'toxic', 'chemical', 'drink', 'ingested'],
    answer: `[IMMEDIATE ACTION: Determine what was swallowed and how much, then call 108 or a poison control center.]
1. Do not induce vomiting unless specifically told to do so by a medical professional or poison control center.
2. If the person is unconscious or having trouble breathing, call 108 immediately and begin CPR if necessary.
3. If the substance is a corrosive chemical (like bleach or acid), do not give them anything to drink as it may cause more damage.
4. If the person is conscious and the substance was not corrosive, you may give them a small amount of water or milk.
5. Save the container or remains of the substance to show to the emergency responders; it helps in choosing the right antidote.
6. If the person has vomited, save a sample of the vomit to help identify the poison in the hospital.
7. Keep the person still and monitor their breathing continuously; some poisons cause delayed respiratory failure.
8. If the poison splashed on their skin or eyes, flush the area with clean water for at least 15-20 minutes.
[What NOT to do: Do not use 'ipecac syrup' or other home remedies to induce vomiting, as they can cause lung injury.]
[Emergency number: 108 or 104 (Health helpline)]`,
    category: 'medical'
  },
  {
    id: 'm14',
    question: 'How do I treat a hypothermia victim?',
    keywords: ['hypothermia', 'cold', 'shivering', 'frozen', 'temperature', 'exposure'],
    answer: `[IMMEDIATE ACTION: Move the person to a warm, dry place and remove any wet clothing immediately.]
1. Hypothermia occurs when the body temperature drops below 95°F (35°C). It is a life-threatening emergency.
2. Warm the person's core first (chest, neck, and groin) using dry blankets or your own body heat.
3. If the person is alert, give them warm, sweet, non-alcoholic liquids to drink (like warm tea or soup).
4. Do not apply direct heat like hot water or heating pads, as this can cause skin damage and heart rhythm issues.
5. Avoid rubbing or massaging the person's limbs; rough handling could trigger a cardiac arrest in a severely cold person.
6. If they are unconscious and not breathing, start CPR; continue until they are warm or professional help arrives.
7. Wrap the person in several layers of dry clothing and a windproof/waterproof outer layer like a tarp or foil blanket.
8. Monitor their mental state; confusion, slurred speech, and loss of shivering are signs of worsening hypothermia.
[What NOT to do: Do not give the person alcohol; it makes the body lose heat faster by dilating blood vessels.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm15',
    question: 'Someone is having a severe allergic reaction (anaphylaxis) what do I do?',
    keywords: ['allergic', 'allergy', 'anaphylaxis', 'sting', 'swelling', 'EpiPen'],
    answer: `[IMMEDIATE ACTION: Call 108 immediately and ask if the person has an epinephrine auto-injector (EpiPen).]
1. Recognize signs: swelling of the face/lips/tongue, difficulty breathing, wheezing, hives, and a rapid pulse.
2. If they have an EpiPen, help them use it immediately by pressing it firmly into the outer thigh (can be through clothing).
3. Have the person lie flat on their back with their legs elevated to maintain blood flow to the heart and brain.
4. If they are vomiting or having trouble breathing, lay them on their side to keep their airway clear.
5. Loosen any tight clothing and stay with the person; a second reaction may occur within minutes.
6. If the person stops breathing, begin CPR compressions immediately and continue until help arrives.
7. Reassure the person and keep them calm; stress can worsen the physiological symptoms of the reaction.
8. Note the exact time the EpiPen was administered to report it to the paramedics.
[What NOT to do: Do not give an oral antihistamine for a severe reaction where the person is struggling to breathe.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm16',
    question: 'How do I treat a spider or insect bite?',
    keywords: ['spider', 'insect', 'bite', 'sting', 'bee', 'wasp', 'scorpion'],
    answer: `[IMMEDIATE ACTION: Remove any stinger by scraping it with a flat object like a credit card.]
1. Wash the bite or sting area with soap and water to prevent infection.
2. Apply a cold pack or ice (wrapped in a cloth) for 10 minutes to reduce swelling and numb the pain.
3. If the bite is on a limb, keep it elevated to help minimize swelling.
4. Do not scratch the area, as this increases the risk of infection and spreads the venom further.
5. Monitor the person for signs of a severe allergic reaction (swelling of the throat, difficulty breathing, or collapse).
6. For a scorpion or black widow bite, keep the person as still as possible and seek immediate medical attention.
7. Use calamine lotion or an over-the-counter antihistamine if the itching is severe and there is no whole-body reaction.
8. If the bite site starts to develop a "bullseye" rash or necrotic (black) center over the next few days, see a doctor.
[What NOT to do: Do not use tweezers to pull out a bee stinger; you may squeeze more venom into the wound.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm17',
    question: "Someone has a nosebleed that won't stop what do I do?",
    keywords: ['nosebleed', 'nose', 'blood', 'bleeding', 'face'],
    answer: `[IMMEDIATE ACTION: Sit the person upright and lean their head forward slightly.]
1. Pinch the soft part of the nose just below the bridge firmly for at least 10 to 15 minutes without letting go.
2. Tell the person to breathe through their mouth while their nose is pinched.
3. Apply a cold pack or ice (wrapped in cloth) to the bridge of the nose to help constrict the blood vessels.
4. Do not let the person lean their head back; this causes blood to run down the throat and can lead to vomiting or choking.
5. If the bleeding hasn't stopped after 20 minutes of continuous pressure, seek medical attention at a clinic.
6. After the bleeding stops, tell the person not to blow their nose or pick it for at least 24 hours to allow the clot to set.
7. If the nosebleed was caused by a heavy blow to the head, watch for signs of concussion or a skull fracture.
8. If the person feels faint or has lost a large amount of blood, have them lie on their side with their head elevated.
[What NOT to do: Do not pack the nose with tissues or cotton, as removing them may restart the bleeding.]
[Emergency number: 112 or 108]`,
    category: 'medical'
  },
  {
    id: 'm18',
    question: 'How do I recognize and treat internal bleeding?',
    keywords: ['internal', 'bleeding', 'stomach', 'bruise', 'hidden', 'shock'],
    answer: `[IMMEDIATE ACTION: Call 108 immediately and treat the person for shock.]
1. Recognize signs: pain/swelling in the abdomen, coughing up blood, dark/tarry stools, and signs of shock (dizziness, pale skin).
2. Have the person lie flat on their back and elevate their legs about 12 inches if they have no leg or spinal injuries.
3. Keep the person completely still; any movement can increase the rate of internal bleeding.
4. Do not give them anything to eat or drink, as they will likely need surgery upon arrival at the hospital.
5. Loosen any tight clothing and keep the person warm with a blanket to maintain their core body temperature.
6. Stay with the person and monitor their level of consciousness and breathing rate continuously.
7. If they lose consciousness and stop breathing, begin CPR immediately.
8. Reassure the person; their heart rate will increase if they are anxious, which can worsen the bleeding.
[What NOT to do: Do not ignore internal bleeding because there is no outer wound; it is often more dangerous than external bleeding.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm19',
    question: 'How do I treat a chemical burn on their skin what do I do?',
    keywords: ['chemical', 'burn', 'acid', 'alkali', 'skin', 'corrosive'],
    answer: `[IMMEDIATE ACTION: Flush the area with cool running water for at least 20 minutes.]
1. Remove any contaminated clothing or jewelry while flushing the area, but be careful not to spread the chemical to yourself.
2. If the chemical is a dry powder, brush it off the skin using a cloth or soft brush before flushing with water.
3. Ensure the water runoff does not come into contact with unaffected parts of the person's body or your own skin.
4. Do not try to 'neutralize' the chemical with other substances (like putting vinegar on a lye burn), as this can cause a heat-generating reaction.
5. Cover the burned area loosely with a sterile, non-stick dressing or clean cloth after flushing.
6. If the chemical is in the eyes, flush them for at least 20 minutes from the inner corner outward.
7. Seek immediate medical attention at an emergency room to check for deep tissue damage or systemic poisoning.
8. Note the name of the chemical or take the container with you to help doctors determine the best treatment.
[What NOT to do: Do not apply ointments or salves to a chemical burn before it has been thoroughly flushed and inspected.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm20',
    question: 'How do I treat an electric shock victim safely?',
    keywords: ['electric', 'shock', 'electrocuted', 'wire', 'power', 'current'],
    answer: `[IMMEDIATE ACTION: Do not touch the person if they are still in contact with the electrical source.]
1. Turn off the power supply at the main switch or unplug the appliance if it's safe to do so.
2. If you cannot turn off the power, use a non-conductive object (like a dry wooden stick or plastic pipe) to push the person away from the source.
3. Call 108 immediately, as electric shocks can cause hidden heart rhythm issues and internal burns.
4. Once the person is safe, check for breathing and a pulse; start CPR if they are not breathing.
5. Check for entry and exit wounds on their skin; these are often small but indicate a path of internal damage.
6. Cover any burns with a sterile, non-stick bandage; do not use wet cloths, which could cause further chilling.
7. Treat for shock by laying the person flat and elevating their legs, unless they have other injuries.
8. Monitor the person continuously, as their heart may stop or become irregular even several minutes after the shock.
[What NOT to do: Do not use metal objects or anything wet to pull the person away from a live current.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm21',
    question: 'Someone is vomiting severely and dehydrated what do I do?',
    keywords: ['vomit', 'diarrhea', 'dehydrated', 'ORS', 'stomach', 'poisoning'],
    answer: `[IMMEDIATE ACTION: Provide Oral Rehydration Salts (ORS) in small, frequent sips.]
1. Dehydration signs include extreme thirst, dark urine, dry mouth, and dizziness when standing up.
2. If ORS is not available, make a home solution: 6 teaspoons of sugar and 1/2 teaspoon of salt in 1 liter of clean water.
3. Give the person small amounts of fluid frequently (e.g., a spoonful every minute) rather than large gulps, which may cause more vomiting.
4. If the person cannot keep any fluids down for more than 4-6 hours, they need intravenous (IV) fluids at a clinic or hospital.
5. Keep the person cool and let them rest in a quiet, well-ventilated area.
6. Monitor for signs of severe dehydration: sunken eyes, no urine for many hours, and confusion.
7. If the vomiting is accompanied by high fever or severe abdominal pain, seek immediate medical attention.
8. Once the vomiting stops, offer bland foods like bananas, rice, or toast (the BRAT diet).
[What NOT to do: Do not give the person plain water only; they need the salt and sugar in ORS to absorb the water properly.]
[Emergency number: 108 or 104]`,
    category: 'medical'
  },
  {
    id: 'm22',
    question: 'How do I treat a dislocated joint?',
    keywords: ['dislocated', 'joint', 'shoulder', 'finger', 'bone', 'out'],
    answer: `[IMMEDIATE ACTION: Immobilize the joint in the position it was found and do not try to "pop" it back.]
1. Trying to reset a dislocation yourself can damage nerves, blood vessels, and ligaments surrounding the joint.
2. Use a sling or splint to keep the joint from moving; for a shoulder, use a cloth to tie the arm to the torso.
3. Apply an ice pack (wrapped in a cloth) to the area to reduce pain and swelling.
4. Check for circulation below the joint: ensure the hand or foot is warm and has a normal color.
5. If the limb becomes cold or blue, it is a medical emergency; seek professional help immediately.
6. Give the person a recommended dose of pain-reliever like ibuprofen if they have no allergies.
7. Move the person carefully to a hospital emergency room for a professional reduction and X-rays.
8. Monitor the person for signs of shock if the pain is extreme.
[What NOT to do: Do not use heat on a fresh dislocation; it will increase swelling and pain.]
[Emergency number: 112 or 108]`,
    category: 'medical'
  },
  {
    id: 'm23',
    question: 'Someone has a severe headache and neck stiffness what do I do?',
    keywords: ['headache', 'neck', 'stiff', 'meningitis', 'fever', 'light'],
    answer: `[IMMEDIATE ACTION: Seek emergency medical care immediately as these are signs of meningitis.]
1. Recognize signs: high fever, severe headache, neck stiffness (unable to touch chin to chest), and sensitivity to light.
2. Keep the person in a dark, quiet room to minimize discomfort from light and sound while waiting for help.
3. Monitor their temperature and use cool cloths on their forehead to help manage a high fever.
4. Do not give any medication until it's prescribed by a doctor, as it can hide symptoms or cause complications.
5. Watch for signs of confusion, seizures, or a purple/red rash that does not fade when pressed with a glass.
6. If they lose consciousness, place them in the recovery position on their side.
7. Keep a record of the symptoms and when they started for the medical team.
8. Encourage the person to stay as still as possible; movement can increase the pressure in the head.
[What NOT to do: Do not wait for a rash to appear; the other symptoms alone are enough for a medical emergency.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'm24',
    question: 'How do I treat a diabetic emergency (low blood sugar)?',
    keywords: ['diabetes', 'sugar', 'insulin', 'shaking', 'sweating', 'confused'],
    answer: `[IMMEDIATE ACTION: Give the person 15-20 grams of fast-acting sugar immediately.]
1. Signs of low blood sugar (hypoglycemia): shaking, sweating, confusion, pale skin, and extreme hunger or irritability.
2. Fast-acting sugar sources: 3-4 glucose tablets, half a cup of fruit juice, or 1 tablespoon of honey or sugar.
3. Wait 15 minutes for the sugar to be absorbed, then check if they are feeling better.
4. If they still feel shaky or confused, give another 15 grams of sugar.
5. Once they are alert, have them eat a longer-acting carbohydrate like a sandwich or a meal.
6. If the person is unconscious or cannot swallow, do not try to give them food or drink; call 108 immediately.
7. If available and you are trained, administer a glucagon injection for an unconscious diabetic.
8. Stay with the person until they are fully recovered and their thinking is clear.
[What NOT to do: Do not give a person insulin if you are unsure whether their blood sugar is high or low.]
[Emergency number: 108 or 112]`
  }
);

DISASTER_QA.push(
  // WATER AND FOOD SAFETY
  {
    id: 'wf1',
    question: 'How do I make a solar water still?',
    keywords: ['solar', 'still', 'water', 'purify', 'sun', 'distill'],
    answer: `[IMMEDIATE ACTION: Dig a hole in a sunny spot and use plastic to collect evaporated water.]
1. Dig a hole about 3 feet wide and 2 feet deep in soil that is moist or has green vegetation at the bottom.
2. Place a clean collection container (like a cup or bowl) in the center of the hole's bottom.
3. Cover the hole with a clear plastic sheet and secure the edges with heavy soil or stones to make it airtight.
4. Place a small stone in the center of the plastic, directly over the collection cup, to create a downward cone.
5. The sun's heat will evaporate moisture from the soil/plants, which condenses on the plastic and drips into the cup.
6. You can increase output by adding non-poisonous green leaves or even urine to the hole (outside the collection cup).
7. It takes several hours to collect a significant amount of water; do not open the still frequently as it loses heat.
8. This method removes salts, heavy metals, and most pathogens, providing distilled-quality water.
[What NOT to do: Do not use poisonous plants like oleander in the hole, as their toxins can evaporate and contaminate the water.]
[Emergency number: 112 or 1078]`,
    category: 'water_food'
  },
  {
    id: 'wf2',
    question: 'How do I know if food is spoiled without power?',
    keywords: ['spoiled', 'rot', 'food', 'power', 'refrigerator', 'smell'],
    answer: `[IMMEDIATE ACTION: When in doubt, throw it out. Never taste food to see if it is safe.]
1. Check the temperature: if the interior of your fridge has been above 40°F (4°C) for more than 2 hours, discard perishables.
2. Smell test: look for 'off' odors in meat, poultry, and fish. However, some bacteria like E. coli do not produce smells.
3. Texture test: discard meat that feels slimy, sticky, or has changed color (e.g., beef turning grey or green).
4. Thawed food: you can safely refreeze food if it still contains ice crystals or is below 40°F.
5. Soft cheeses and milk: discard if they have been at room temperature for more than 2 hours.
6. Canned goods: discard if the can is bulging, leaking, or rusted, or if the food inside is foamy or smells bad.
7. Vegetables: discard leafy greens that have wilted or become slimy; hard vegetables like carrots last longer.
8. Eggs: discard if they have a cracked shell or if they float in a bowl of water (a sign of gas buildup from rot).
[What NOT to do: Do not rely on appearances alone; harmful bacteria can grow on food without visible mold.]
[Emergency number: 112 or 104]`,
    category: 'water_food'
  },
  {
    id: 'wf3',
    question: 'Is it safe to eat garden vegetables after a flood?',
    keywords: ['garden', 'vegetable', 'flood', 'eat', 'contaminated', 'dirt'],
    answer: `[IMMEDIATE ACTION: Discard all leafy vegetables like spinach or lettuce that were touched by floodwater.]
1. Floodwater often contains raw sewage, heavy metals, and chemical runoff that can penetrate soft plant tissues.
2. Underground crops (potatoes, carrots) may be safe if the ground has dried, but they must be scrubbed and boiled.
3. Fruits with thick skins (melons, squash) that were not in direct contact with water may be salvaged if sanitized properly.
4. Sanitizing: wash firm produce in a solution of 1 tablespoon bleach to 1 gallon of water, then rinse with purified water.
5. Cooked is better: always cook garden produce from flooded areas; never eat it raw in salads.
6. If the flood involved industrial runoff or a known chemical spill, discard the entire garden's yield.
7. Wait at least 60-90 days after the flood before harvesting new crops from the contaminated soil.
8. Monitor the soil for strange odors or oily residues which indicate long-term chemical contamination.
[What NOT to do: Do not eat produce that has soft spots or cracks where floodwater could have seeped inside.]
[Emergency number: 112 or 104]`,
    category: 'water_food'
  },
  {
    id: 'wf4',
    question: 'How do I store water long-term for disasters?',
    keywords: ['store', 'water', 'long-term', 'container', 'disaster', 'reserve'],
    answer: `[IMMEDIATE ACTION: Use only food-grade plastic containers and store them in a cool, dark place.]
1. Wash containers thoroughly with dish soap and rinse, then sanitize with 1 teaspoon of bleach in 1 quart of water.
2. Fill the container with tap water; if your water is not chlorinated, add 8 drops of unscented bleach per gallon.
3. Seal the container tightly using its original cap; avoid using milk jugs as they are thin and degrade quickly.
4. Store water away from direct sunlight and heat, which promote the growth of algae and bacteria.
5. Keep water containers away from gasoline, pesticides, or other chemicals, as plastic can absorb vapors over time.
6. Rotate your water supply every 6 months to ensure it stays fresh and the containers remain structural.
7. Label each container with the date it was filled and the date it should be replaced.
8. For long-term emergency use, aim for at least 3 gallons per person for a minimum 3-day supply.
[What NOT to do: Do not use glass containers for long-term storage as they can break easily during an earthquake or flood.]
[Emergency number: 112 or 1078]`,
    category: 'water_food'
  },
  {
    id: 'wf5',
    question: 'What are the first signs of waterborne illness?',
    keywords: ['illness', 'water', 'symptoms', 'cholera', 'typhoid', 'diarrhea'],
    answer: `[IMMEDIATE ACTION: Start ORS treatment at the first sign of diarrhea and seek medical help.]
1. Common symptoms: severe watery diarrhea, stomach cramps, nausea, vomiting, and a low-grade fever.
2. Dehydration: watch for dry mouth, lack of tears, sunken eyes, and decreased urination.
3. Fatigue: a sudden feeling of extreme weakness or lightheadedness when trying to stand up.
4. In children: irritability, lethargy, and a 'tenting' of the skin when pinched (it stays up instead of flattening).
5. If you see blood in the stool, it is a sign of dysentery or a more severe infection that requires antibiotics.
6. Record when the symptoms started and what the person has eaten or drunk in the last 24 hours.
7. Isolate the sick person to prevent the spread of the illness to other family members or camp residents.
8. Ensure all caregivers wash their hands thoroughly with purified water and soap after attending to the patient.
[What NOT to do: Do not wait for the symptoms to 'get better' on their own; dehydration can become fatal in 24 hours.]
[Emergency number: 108 or 104]`,
    category: 'water_food'
  },
  {
    id: 'wf6',
    question: 'How do I use bleach to sanitize cooking tools?',
    keywords: ['bleach', 'sanitize', 'disinfect', 'dishes', 'tools', 'cooking'],
    answer: `[IMMEDIATE ACTION: Use a solution of 1 tablespoon of unscented bleach per gallon of clean water.]
1. Wash all dishes and tools with soap and hot water (if possible) to remove visible dirt and grease.
2. Immerse the cleaned items in the bleach solution for at least 2 minutes to kill bacteria and viruses.
3. If you cannot immerse large items, wipe them down thoroughly with the solution and let them air dry.
4. Do not rinse the items with tap water after sanitizing unless the water has been boiled or purified.
5. Allow all tools to air dry completely; using a potentially dirty towel can re-contaminate the surface.
6. Use this same solution to sanitize countertops, cutting boards, and dining tables after every meal.
7. If your bleach is older than 6 months, it may have lost its potency; use a slightly higher concentration.
8. Wear gloves to protect your skin from the bleach solution, especially if you have existing cuts or scratches.
[What NOT to do: Do not use scented, color-safe, or 'splash-less' bleach; they contain additives that are unsafe for food surfaces.]
[Emergency number: 112 or 104]`,
    category: 'water_food'
  },
  {
    id: 'wf7',
    question: 'Someone has severe diarrhea, how do I make ORS?',
    keywords: ['ORS', 'diarrhea', 'dehydration', 'salt', 'sugar', 'solution'],
    answer: `[IMMEDIATE ACTION: Mix 6 teaspoons of sugar and 1/2 teaspoon of salt in 1 liter of clean water.]
1. Ensure the water used is either bottled, boiled, or purified with bleach/tablets.
2. Stir or shake the mixture until the salt and sugar are completely dissolved.
3. Have the sick person take small, frequent sips rather than large gulps, which can trigger more vomiting.
4. For infants, continue breastfeeding alongside the ORS solution to provide extra nutrients and immunity.
5. Aim for a total intake of at least 2-3 liters of ORS per day for an adult with active diarrhea.
6. If the person is vomiting, wait 10 minutes after a vomiting episode and then resume ORS slowly.
7. This solution replaces lost electrolytes (sodium and potassium) and helps the intestines absorb water.
8. If the person shows signs of severe lethargy or cannot drink, they need IV fluids immediately at a hospital.
[What NOT to do: Do not use too much salt; the mixture should taste no saltier than tears.]
[Emergency number: 104 or 108]`,
    category: 'water_food'
  },
  {
    id: 'wf8',
    question: 'How do I keep pests away from food caches?',
    keywords: ['pests', 'rats', 'ants', 'food', 'cache', 'storage'],
    answer: `[IMMEDIATE ACTION: Store food in airtight, hard-plastic or metal containers.]
1. Hang food bags from a high tree branch or a ceiling hook using a thin wire that rats cannot climb.
2. Use 'anti-ant' moats: place the legs of your food table in bowls filled with water and a drop of soap.
3. Keep the storage area completely clean; even a few crumbs can attract an entire colony of ants or rodents.
4. Seal cracks and holes in your shelter walls with mud or wood to prevent easy entry for small animals.
5. Store high-scent foods (like dried fish or sugar) in vacuum-sealed bags or double-layer plastic to hide the smell.
6. Dispose of food waste and garbage at least 100 feet away from your main living and sleeping area.
7. Use natural repellents like peppermint oil or crushed garlic around the perimeter of your food storage.
8. Inspect your cache daily for signs of gnawing, droppings, or insect trails; discard any compromised food immediately.
[What NOT to do: Do not store food directly on the ground; moisture and soil-dwelling insects will quickly destroy it.]
[Emergency number: 112 or 1078]`
  }
);

DISASTER_QA.push(
  // CYCLONES
  {
    id: 'c1',
    question: 'How do I prepare my home for an approaching cyclone?',
    keywords: ['cyclone', 'prepare', 'home', 'storm', 'wind', 'protection'],
    answer: `[IMMEDIATE ACTION: Secure loose objects outside and reinforce all windows and doors.]
1. Store all outdoor furniture, plant pots, and toys inside; high winds can turn these into deadly projectiles.
2. Protect windows using specialized storm shutters or by taping a large 'X' with heavy-duty duct tape (though plywood is better).
3. Trim tree branches that are close to your house or power lines to prevent them from falling and causing damage.
4. Fill your bathtubs and large containers with clean water in case the water supply is interrupted.
5. Charge all phones, power banks, and flashlights; ensure you have a battery-powered radio for weather updates.
6. Clear gutters and drains to prevent rainwater from pooling and flooding your foundation.
7. If your home has a weak roof, use 'cyclone straps' or heavy ropes to tie the rafters down to the foundation.
8. Prepare a 'Safe Room' in the interior of the house with no windows, stocked with your Go-Bag and bedding.
[What NOT to do: Do not leave windows slightly open to 'balance' pressure; this is a myth that allows wind to lift the roof.]
[Emergency number: 112 or 1078]`,
    category: 'cyclone'
  },
  {
    id: 'c2',
    question: 'The eye of the cyclone is passing, is it safe to go out?',
    keywords: ['eye', 'cyclone', 'calm', 'safe', 'storm', 'passing'],
    answer: `[IMMEDIATE ACTION: Stay indoors! The storm is only half over and the strongest winds are coming.]
1. The 'eye' is a temporary calm that occurs in the center of the cyclone; it is followed immediately by the second half of the storm.
2. The winds on the other side of the eye will come from the opposite direction and are often more destructive.
3. Stay in your safe room and do not be fooled by the appearing sun or sudden silence.
4. Use this brief period only to fix a life-threatening structural failure if it is absolutely necessary and can be done in 2 minutes.
5. Monitor your radio for confirmation on whether the entire storm system has moved past your area.
6. Ensure your family members do not wander outside to 'inspect the damage'; many people are killed by the sudden return of high winds.
7. Be prepared for falling debris and downed power lines that may have been weakened during the first half.
8. If you are caught outside during the eye, find the strongest structure nearby and get inside immediately.
[What NOT to do: Do not assume the storm is over; the second half of a cyclone often carries the most dangerous storm surge.]
[Emergency number: 112 or 1078]`,
    category: 'cyclone'
  },
  {
    id: 'c3',
    question: 'How do I reinforce windows without plywood?',
    keywords: ['window', 'reinforce', 'cyclone', 'glass', 'tape'],
    answer: `[IMMEDIATE ACTION: Use heavy-duty duct tape to create a dense grid over the glass surface.]
1. Apply tape in a 'criss-cross' or 'star' pattern across the entire window to help the glass resist shrapnel impact.
2. Tape does not stop the glass from breaking, but it helps hold the shards together, preventing them from flying into the room.
3. Close and lock all shutters or curtains; if the glass breaks, the fabric can catch some of the flying debris.
4. Use heavy furniture (like a sofa or mattress) to block windows from the inside if they start to rattle or crack.
5. If you have extra wood, even small scraps, nail them diagonally across the frame to add structural rigidity.
6. Apply a layer of thick plastic sheeting or a tarp to the outside of the window if you have a safe way to anchor it.
7. Stay away from windows during the storm; even reinforced glass is the most vulnerable part of your home.
8. If a window blows in, move to an interior room and close the door immediately to prevent the wind from damaging the rest of the house.
[What NOT to do: Do not use thin masking tape or scotch tape; they provide zero protection against high-wind impact.]
[Emergency number: 112 or 1078]`
  },
  {
    id: 'c4',
    question: 'What do I do if my roof starts to lift during a cyclone?',
    keywords: ['roof', 'lift', 'cyclone', 'wind', 'flying', 'structural'],
    answer: `[IMMEDIATE ACTION: Move to the smallest interior room or under a heavy piece of furniture.]
1. If the roof starts to lift, the air pressure inside the house is too high; open a window on the side opposite the wind.
2. Get onto the floor and cover yourself with a mattress or heavy blankets to protect against falling tiles or timber.
3. If the roof is completely lost, move to a bathroom or closet, as these small rooms have stronger wall support.
4. Do not try to hold the roof down with your hands or body weight; the force of the wind is significantly stronger than you.
5. If you are in a multi-story building, move to the lowest floor immediately.
6. Watch for electrical wires that may have been pulled loose as the roof detached; avoid all metal pipes and water.
7. Keep your whistle and flashlight with you so you can signal rescuers if the walls also begin to fail.
8. Stay low and protect your head with your arms or a helmet if you have one.
[What NOT to do: Do not stand near the center of a room with a lifting roof; stay against the strongest interior walls.]
[Emergency number: 112 or 101]`,
    category: 'cyclone'
  },
  {
    id: 'c5',
    question: 'How do I safely clear debris after a cyclone?',
    keywords: ['debris', 'clear', 'after', 'cyclone', 'cleanup', 'downed'],
    answer: `[IMMEDIATE ACTION: Wear thick gloves, boots, and long sleeves to protect against sharp objects and infections.]
1. Treat every downed wire as live and dangerous; stay at least 30 feet away and report them to the power company.
2. Watch for snakes and displaced animals that may be hiding under piles of wood or roofing sheets.
3. Use a team approach to move heavy objects; never try to lift large structural beams or trees alone.
4. Photograph all damage for insurance purposes before you move or dispose of any major items.
5. Be careful when using chainsaws or power tools; fatigue after a storm leads to many cleanup injuries.
6. Avoid walking through standing water, which may hide sharp glass, metal, or sewage contamination.
7. Check for gas leaks (smell of rotten eggs) before using any tools that could create a spark.
8. Pace yourself; heatstroke and overexertion are primary causes of death in the days following a cyclone.
[What NOT to do: Do not burn storm debris; it may contain treated lumber, plastic, or chemicals that release toxic fumes.]
[Emergency number: 112 or 1078]`
  }
);

DISASTER_QA.push(
  // SURVIVAL SKILLS
  {
    id: 's1',
    question: 'How do I start a fire without matches?',
    keywords: ['fire', 'matches', 'lighter', 'start', 'flame', 'friction'],
    answer: `[IMMEDIATE ACTION: Use a lens to focus sunlight or friction to create heat and a spark.]
1. Lens Method: Use a magnifying glass, eyeglass lens, or even a clear plastic bag filled with water to focus sunlight onto dry tinder.
2. Battery Method: Use a 9V battery and a piece of steel wool; touch the terminals to the wool to create an immediate glow.
3. Friction (Bow Drill): Create a bow and spindle to spin a wooden rod against a flat board, creating a hot coal through friction.
4. Flint and Steel: Strike a piece of hard rock (like quartz) against a carbon steel blade to create sparks that land on charred cloth.
5. Fire Plow: Rub a hard stick rapidly back and forth in a groove on a softer wooden board until a coal forms.
6. Preparation: Always have your tinder (dried grass, birch bark, or lint) ready before you begin trying to create heat.
7. Shelter your fire site from wind and rain using a small stone wall or an overhanging log.
8. Gradually move the lit tinder into a 'bird's nest' of small twigs, then slowly add larger sticks as the flame grows.
[What NOT to do: Do not use gasoline or kerosene to 'start' a fire; it can cause an explosion that leads to severe burns.]
[Emergency number: 112 or 101]`,
    category: 'survival'
  },
  {
    id: 's2',
    question: 'How do I build a debris hut for overnight survival?',
    keywords: ['shelter', 'hut', 'debris', 'overnight', 'sleep', 'warmth'],
    answer: `[IMMEDIATE ACTION: Find a long, sturdy ridgepole and lean it against a stable tree or rock.]
1. Prop one end of the ridgepole about 3 feet high and lay the other end on the ground.
2. Lean smaller ribs (sticks) against both sides of the ridgepole to create a 'A-frame' shape.
3. Ensure the frame is just large enough for you to crawl inside; a smaller hut preserves body heat much better.
4. Layer thick amounts of leaves, pine needles, or dry grass (the debris) over the ribs, starting from the bottom up.
5. Aim for at least 3 feet of debris thickness to ensure the hut is waterproof and well-insulated.
6. Fill the inside of the hut with 2 feet of soft debris to act as a sleeping mat and prevent the ground from draining your heat.
7. Use more leaves or a backpack to block the entrance once you are inside to keep the cold air out.
8. Slope the debris to help rain run off the sides; add a layer of bark or large leaves on top for extra protection.
[What NOT to do: Do not build your hut in a dry riverbed or a depression where water will pool if it rains.]
[Emergency number: 112 or 1078]`,
    category: 'survival'
  },
  {
    id: 's3',
    question: 'What plants in India are safe to eat in the wild?',
    keywords: ['plants', 'eat', 'wild', 'food', 'safe', 'survival', 'edible'],
    answer: `[IMMEDIATE ACTION: Never eat any wild plant unless you are 100% sure of its identity.]
1. Amaranth (Chaulai): Common across India; both leaves and seeds are highly nutritious and safe when cooked.
2. Purslane (Kulfa): A succulent with yellow flowers; the leaves are edible raw or cooked and rich in Omega-3.
3. Dandelion: Every part is edible; the leaves can be eaten raw, while the root can be roasted or boiled.
4. Wild Berries: Stick to 'aggregate' berries like wild raspberries if you can find them; avoid white or yellow berries.
5. Bamboo Shoots: Safe when boiled thoroughly to remove bitter toxins; very common in North-East and hilly regions.
6. Prickly Pear: The fruit and the 'pads' are edible once the spines are carefully removed and the skin is peeled.
7. Water Lilies: Roots and seeds can be eaten after being boiled or roasted.
8. Universal Edibility Test: If you must try an unknown plant, rub it on your lip, then touch it to your tongue, then eat a tiny bit—waiting hours between each step.
[What NOT to do: Do not eat any plant that has a milky white sap, bitter taste, or smells like almonds (a sign of cyanide).]
[Emergency number: 112 or 104]`,
    category: 'survival'
  },
  {
    id: 's4',
    question: 'How do I find North without a compass?',
    keywords: ['north', 'compass', 'direction', 'sun', 'stars', 'shadow'],
    answer: `[IMMEDIATE ACTION: Use the "Shadow Tip Method" if it is daytime and sunny.]
1. Stick a straight pole into the ground and mark the tip of its shadow with a small stone.
2. Wait 15-20 minutes and mark the new position of the shadow tip with a second stone.
3. Draw a line between the two stones; this line points East (second stone) and West (first stone).
4. Stand with the first stone on your left and the second on your right; you are now facing North.
5. At night: Locate the Big Dipper constellation; the two 'pointer' stars at the end of the bowl point directly to the North Star (Polaris).
6. Watch the Sun: It rises in the general East and sets in the general West; at noon, a shadow in the Northern Hemisphere points North.
7. Moss Myth: Moss does not always grow on the North side of trees; look for the side with the most dense and green growth for a hint, but don't rely on it.
8. Crescent Moon: If the moon is a crescent, draw an imaginary line between the two 'horns' down to the horizon; that point is roughly South.
[What NOT to do: Do not rely on one method alone; verify your direction using multiple indicators as the day progresses.]
[Emergency number: 112 or 1078]`,
    category: 'survival'
  },
  {
    id: 's5',
    question: 'How do I stay warm without a heater or fire?',
    keywords: ['warm', 'cold', 'heater', 'fire', 'insulation', 'heat'],
    answer: `[IMMEDIATE ACTION: Layer your clothing and stay off the cold ground.]
1. Use the 'Layering' system: a moisture-wicking base layer, an insulating middle layer (fleece/wool), and a windproof outer layer.
2. Stuff your clothing with dry grass, crumpled newspaper, or leaves; this creates 'dead air' space that traps your body heat.
3. Cover your head: you lose a significant amount of heat through your scalp; wear a hat, scarf, or even a towel.
4. Stay dry: wet clothing pulls heat away from your body 25 times faster than dry clothing.
5. Huddle together: share body heat with others or pets to maintain core temperatures.
6. Perform light exercise: moving your arms and legs generates internal heat, but don't sweat, as moisture will eventually chill you.
7. Use 'Vapor Barriers': wrap your feet in plastic bags over your socks to keep moisture in and cold out.
8. Create a small, insulated space: stay in a small tent or a closet to concentrate the heat of your own breath.
[What NOT to do: Do not drink alcohol to 'warm up'; it actually causes your core temperature to drop and increases hypothermia risk.]
[Emergency number: 112 or 112]`,
    category: 'survival'
  },
  {
    id: 's6',
    question: 'How do I find water in a dry area?',
    keywords: ['water', 'dry', 'desert', 'find', 'thirsty', 'source'],
    answer: `[IMMEDIATE ACTION: Look for signs of life—birds flying low or green vegetation in valleys.]
1. Dig in dry stream beds: water often stays just below the surface in the outside bends of a dried-up river.
2. Morning Dew: Tie absorbent cloths around your ankles and walk through tall grass at dawn; wring the water into a cup.
3. Transpiration: Tie a clear plastic bag around a leafy branch; the plant breathes out water that collects in the bag.
4. Watch animals: Birds like pigeons fly toward water at dusk; follow their path to find a spring or pond.
5. Insects: Ants climbing a tree often signify a reservoir of water in a hollow part of the trunk.
6. Rock Crevices: Water can be trapped in deep cracks of shaded rocks; use a tube or straw to reach it.
7. Follow terrain: move toward the lowest point in the landscape, where water naturally drains and accumulates.
8. Avoid digging in the heat of the day; work at dawn or dusk to conserve your own body's moisture.
[What NOT to do: Do not eat food if you are very low on water; your body needs water to digest food, which will dehydrate you further.]
[Emergency number: 112 or 1078]`,
    category: 'survival'
  },
  {
    id: 's7',
    question: 'How do I signal a plane using a mirror?',
    keywords: ['signal', 'plane', 'aircraft', 'mirror', 'sun', 'flash'],
    answer: `[IMMEDIATE ACTION: Aim the reflected light at the aircraft and flash it in groups of three.]
1. Hold the signal mirror or any shiny object (like a phone screen or tin lid) near your eye.
2. Extend your other arm and make a 'V' with your fingers, framing the aircraft in the 'V'.
3. Reflect the sunlight onto your hand, and then tilt the mirror so the reflection passes through the 'V' and hits the plane.
4. Sweep the reflection across the cockpit of the plane; even a small mirror can be seen from 10 miles away.
5. Do not stop signaling once you see the plane; keep flashing until they indicate they have seen you (e.g., by dipping their wings).
6. If the plane is not in sight, 'scan' the horizon continuously with the mirror to catch the attention of any distant aircraft.
7. On a cloudy day, you can still reflect ambient light, though it is much less effective than direct sunlight.
8. Keep the mirror clean; smudges and dirt significantly reduce the brightness and distance of the flash.
[What NOT to do: Do not flash the pilot continuously once they are very close; you could temporarily blind them during a rescue attempt.]
[Emergency number: 112 or 1078]`,
    category: 'survival'
  },
  {
    id: 's8',
    question: 'What should I do if I encounter a wild animal?',
    keywords: ['animal', 'encounter', 'wild', 'dog', 'snake', 'leopard', 'elephant'],
    answer: `[IMMEDIATE ACTION: Do not run; stay calm and back away slowly while facing the animal.]
1. Snake: Freeze immediately and let the snake move away. Most snakes only strike if they feel cornered or stepped on.
2. Leopard/Large Cat: Make yourself look larger by opening your jacket; shout loudly and maintain eye contact. Do not crouch.
3. Elephant: Move downwind so it cannot smell you. If it charges, run in a zigzag pattern or climb a large tree.
4. Wild Dog: Stand your ground and throw stones/sticks; do not turn your back and run, as this triggers their 'prey drive'.
5. Bear: If it's a black bear, shout and be aggressive. If it's a sloth bear (common in India), do not play dead; back away and talk calmly.
6. Avoid's a direct gaze with most animals, as it can be seen as a challenge or threat.
7. Keep your food and waste sealed and away from your sleeping area to prevent attracting nocturnal predators.
8. If an animal bites you, wash the wound with soap for 15 minutes to prevent rabies and seek help immediately.
[What NOT to do: Do not try to feed or take photos with a wild animal; a 'calm' animal is often the most dangerous.]
[Emergency number: 112 or 1800-11-5349 (Forestry Dept)]`,
    category: 'survival'
  },
  {
    id: 's9',
    question: 'How do I cross a fast-moving stream on foot?',
    keywords: ['stream', 'river', 'cross', 'fast', 'water', 'walking'],
    answer: `[IMMEDIATE ACTION: Do not cross if the water is above your knees or moving faster than you can walk.]
1. Look for the widest part of the river: the water is usually shallower and slower there than in narrow sections.
2. Wear your shoes: they provide traction and protect your feet from sharp rocks and glass on the riverbed.
3. Use a sturdy stick: use it as a 'third leg' on the upstream side to maintain balance as the water pushes against you.
4. Face upstream and lean slightly forward; move sideways across the current while keeping two points of contact with the ground.
5. Loosen your backpack straps: if you fall, you must be able to jettison your heavy bag immediately so it doesn't pull you under.
6. Cross as a group: link arms and move together in a line parallel to the current to break the force of the water.
7. Look for a 'landing point' downstream on the opposite bank in case you get swept off your feet while crossing.
8. If the water is too fast, wait for it to recede (usually at dawn) or look for a fallen tree to use as a bridge.
[What NOT to do: Do not cross just above a waterfall, a pile of fallen trees (strainers), or any major hazard.]
[Emergency number: 112 or 1078]`,
    category: 'survival'
  },
  {
    id: 's10',
    question: 'How do I maintain morale in a group during a disaster?',
    keywords: ['morale', 'group', 'leadership', 'calm', 'hope', 'teamwork'],
    answer: `[IMMEDIATE ACTION: Assign clear tasks to everyone to keep them focused and useful.]
1. Establish a routine: regular times for meals, meetings, and rest provide a sense of normalcy in a chaotic situation.
2. Communicate transparently: share all known facts and instructions from authorities to prevent the spread of terrifying rumors.
3. Encourage sharing: let people express their fears and frustrations, but redirect the conversation toward immediate solutions.
4. Celebrate small wins: finding a dry blanket or successfully purifying water should be acknowledged to build confidence.
5. Maintain hygiene: encouraging people to wash their faces and comb their hair can significantly improve their self-esteem.
6. Stay positive but realistic: don't make promises about when rescue will arrive, but highlight the group's strength and resilience.
7. Rotate leadership: if one person is becoming exhausted, let another take charge of specific decisions for a while.
8. Keep children engaged: give them 'jobs' like watching the weather or sorting clean stones to keep their minds off the crisis.
[What NOT to do: Do not allow one person to dominate with negativity; isolate persistent complainers and talk to them privately.]
[Emergency number: 112 or 1091]`,
    category: 'survival'
  },
  {
    id: 'm16',
    question: 'How to treat a snake bite?',
    keywords: ['snake', 'bite', 'cobra', 'viper', 'poisonous', 'venom'],
    answer: `[IMMEDIATE ACTION: Keep the bitten limb still and below heart level, and call 108 immediately.]
1. Stay calm and move away from the snake to prevent further bites; do not try to catch or kill it.
2. Remove any jewelry or tight clothing near the bite site, as swelling will likely occur rapidly.
3. Clean the wound gently with water but do not flush it with high pressure.
4. Apply a firm but not tight bandage (like for a sprain) starting from the bite and wrapping up the limb.
5. Immoblize the limb with a splint if possible; movement spreads the venom faster through the lymphatic system.
6. Note the snake's appearance (color, pattern, head shape) or take a photo from a safe distance for the doctor.
7. Keep the person calm and reassure them while waiting for medical help.
8. If the person stops breathing or their heart stops, begin CPR immediately.
[What NOT to do: Do NOT use a tourniquet, do NOT cut the wound, and do NOT attempt to suck out the venom; these methods are ineffective and dangerous.]
[Emergency number: 108 or 112]`,
    category: 'medical'
  },
  {
    id: 'f14',
    question: 'I am stuck in heavy rain or monsoon downpours what do I do?',
    keywords: ['rain', 'heavy', 'monsoon', 'downpour', 'storm', 'rainfall', 'stuck', 'weather'],
    answer: `[IMMEDIATE ACTION: Seek sturdy indoor shelter immediately and avoid all waterlogged areas.]
1. If you are outside during extremely heavy rain, find the nearest permanent building; avoid temporary structures or sheds.
2. Do not take shelter under trees, as they can attract lightning or collapse due to saturated soil.
3. Stay away from open drains, manholes, and culverts; heavy rain can cause sudden, powerful surges that can pull a person in.
4. If driving, pull over to a safe area away from trees and power lines; hazard lights should be kept on.
5. Watch for signs of flash flooding, such as rapidly rising water or a sudden roaring sound from upstream.
6. Avoid touching any electrical poles or low-hanging wires, which are extremely dangerous in wet conditions.
7. If you are stuck in a vehicle and water is rising, evacuate to higher ground before the doors become impossible to open.
8. Unplug non-essential electronic devices at home to protect against power surges caused by lightning.
[What NOT to do: Do not attempt to walk or drive through more than 6 inches of water; you cannot see what lies beneath the surface.]
[Emergency number: 112 or 1078 (Disaster management)]`,
    category: 'flood'
  }
);
