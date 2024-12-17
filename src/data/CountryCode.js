const codes = [
    {
        country: 'Vietnam',
        countryCodes: ['84'],
    },
    {
        country: 'Afghanistan',
        countryCodes: ['93'],
    },
    {
        country: 'Albania',
        countryCodes: ['355'],
    },
    {
        country: 'Algeria',
        countryCodes: ['213'],
    },
    {
        country: 'American Samoa',
        countryCodes: ['1-684'],
    },
    {
        country: 'Andorra',
        countryCodes: ['376'],
    },
    {
        country: 'Angola',
        countryCodes: ['244'],
    },
    {
        country: 'Anguilla',
        countryCodes: ['1-264'],
    },
    {
        country: 'Antarctica',
        countryCodes: ['672'],
    },
    {
        country: 'Antigua and Barbuda',
        countryCodes: ['1-268'],
    },
    {
        country: 'Argentina',
        countryCodes: ['54'],
    },
    {
        country: 'Armenia',
        countryCodes: ['374'],
    },
    {
        country: 'Aruba',
        countryCodes: ['297'],
    },
    {
        country: 'Australia',
        countryCodes: ['61'],
    },
    {
        country: 'Austria',
        countryCodes: ['43'],
    },
    {
        country: 'Azerbaijan',
        countryCodes: ['994'],
    },
    {
        country: 'Bahamas',
        countryCodes: ['1-242'],
    },
    {
        country: 'Bahrain',
        countryCodes: ['973'],
    },
    {
        country: 'Bangladesh',
        countryCodes: ['880'],
    },
    {
        country: 'Barbados',
        countryCodes: ['1-246'],
    },
    {
        country: 'Belarus',
        countryCodes: ['375'],
    },
    {
        country: 'Belgium',
        countryCodes: ['32'],
    },
    {
        country: 'Belize',
        countryCodes: ['501'],
    },
    {
        country: 'Benin',
        countryCodes: ['229'],
    },
    {
        country: 'Bermuda',
        countryCodes: ['1-441'],
    },
    {
        country: 'Bhutan',
        countryCodes: ['975'],
    },
    {
        country: 'Bolivia',
        countryCodes: ['591'],
    },
    {
        country: 'Bosnia and Herzegovina',
        countryCodes: ['387'],
    },
    {
        country: 'Botswana',
        countryCodes: ['267'],
    },
    {
        country: 'Brazil',
        countryCodes: ['55'],
    },
    {
        country: 'British Indian Ocean Territory',
        countryCodes: ['246'],
    },
    {
        country: 'British Virgin Islands',
        countryCodes: ['1-284'],
    },
    {
        country: 'Brunei',
        countryCodes: ['673'],
    },
    {
        country: 'Bulgaria',
        countryCodes: ['359'],
    },
    {
        country: 'Burkina Faso',
        countryCodes: ['226'],
    },
    {
        country: 'Burundi',
        countryCodes: ['257'],
    },
    {
        country: 'Cambodia',
        countryCodes: ['855'],
    },
    {
        country: 'Cameroon',
        countryCodes: ['237'],
    },
    {
        country: 'Canada',
        countryCodes: ['1'],
    },
    {
        country: 'Cape Verde',
        countryCodes: ['238'],
    },
    {
        country: 'Cayman Islands',
        countryCodes: ['1-345'],
    },
    {
        country: 'Central African Republic',
        countryCodes: ['236'],
    },
    {
        country: 'Chad',
        countryCodes: ['235'],
    },
    {
        country: 'Chile',
        countryCodes: ['56'],
    },
    {
        country: 'China',
        countryCodes: ['86'],
    },
    {
        country: 'Christmas Island',
        countryCodes: ['61'],
    },
    {
        country: 'Cocos Islands',
        countryCodes: ['61'],
    },
    {
        country: 'Colombia',
        countryCodes: ['57'],
    },
    {
        country: 'Comoros',
        countryCodes: ['269'],
    },
    {
        country: 'Cook Islands',
        countryCodes: ['682'],
    },
    {
        country: 'Costa Rica',
        countryCodes: ['506'],
    },
    {
        country: 'Croatia',
        countryCodes: ['385'],
    },
    {
        country: 'Cuba',
        countryCodes: ['53'],
    },
    {
        country: 'Curacao',
        countryCodes: ['599'],
    },
    {
        country: 'Cyprus',
        countryCodes: ['357'],
    },
    {
        country: 'Czech Republic',
        countryCodes: ['420'],
    },
    {
        country: 'Democratic Republic of the Congo',
        countryCodes: ['243'],
    },
    {
        country: 'Denmark',
        countryCodes: ['45'],
    },
    {
        country: 'Djibouti',
        countryCodes: ['253'],
    },
    {
        country: 'Dominica',
        countryCodes: ['1-767'],
    },
    {
        country: 'Dominican Republic',
        countryCodes: ['1-809', '1-829', '1-849'],
    },
    {
        country: 'East Timor',
        countryCodes: ['670'],
    },
    {
        country: 'Ecuador',
        countryCodes: ['593'],
    },
    {
        country: 'Egypt',
        countryCodes: ['20'],
    },
    {
        country: 'El Salvador',
        countryCodes: ['503'],
    },
    {
        country: 'Equatorial Guinea',
        countryCodes: ['240'],
    },
    {
        country: 'Eritrea',
        countryCodes: ['291'],
    },
    {
        country: 'Estonia',
        countryCodes: ['372'],
    },
    {
        country: 'Ethiopia',
        countryCodes: ['251'],
    },
    {
        country: 'Falkland Islands',
        countryCodes: ['500'],
    },
    {
        country: 'Faroe Islands',
        countryCodes: ['298'],
    },
    {
        country: 'Fiji',
        countryCodes: ['679'],
    },
    {
        country: 'Finland',
        countryCodes: ['358'],
    },
    {
        country: 'France',
        countryCodes: ['33'],
    },
    {
        country: 'French Polynesia',
        countryCodes: ['689'],
    },
    {
        country: 'Gabon',
        countryCodes: ['241'],
    },
    {
        country: 'Gambia',
        countryCodes: ['220'],
    },
    {
        country: 'Georgia',
        countryCodes: ['995'],
    },
    {
        country: 'Germany',
        countryCodes: ['49'],
    },
    {
        country: 'Ghana',
        countryCodes: ['233'],
    },
    {
        country: 'Gibraltar',
        countryCodes: ['350'],
    },
    {
        country: 'Greece',
        countryCodes: ['30'],
    },
    {
        country: 'Greenland',
        countryCodes: ['299'],
    },
    {
        country: 'Grenada',
        countryCodes: ['1-473'],
    },
    {
        country: 'Guam',
        countryCodes: ['1-671'],
    },
    {
        country: 'Guatemala',
        countryCodes: ['502'],
    },
    {
        country: 'Guernsey',
        countryCodes: ['44-1481'],
    },
    {
        country: 'Guinea',
        countryCodes: ['224'],
    },
    {
        country: 'Guinea-Bissau',
        countryCodes: ['245'],
    },
    {
        country: 'Guyana',
        countryCodes: ['592'],
    },
    {
        country: 'Haiti',
        countryCodes: ['509'],
    },
    {
        country: 'Honduras',
        countryCodes: ['504'],
    },
    {
        country: 'Hong Kong',
        countryCodes: ['852'],
    },
    {
        country: 'Hungary',
        countryCodes: ['36'],
    },
    {
        country: 'Iceland',
        countryCodes: ['354'],
    },
    {
        country: 'India',
        countryCodes: ['91'],
    },
    {
        country: 'Indonesia',
        countryCodes: ['62'],
    },
    {
        country: 'Iran',
        countryCodes: ['98'],
    },
    {
        country: 'Iraq',
        countryCodes: ['964'],
    },
    {
        country: 'Ireland',
        countryCodes: ['353'],
    },
    {
        country: 'Isle of Man',
        countryCodes: ['44-1624'],
    },
    {
        country: 'Israel',
        countryCodes: ['972'],
    },
    {
        country: 'Italy',
        countryCodes: ['39'],
    },
    {
        country: 'Ivory Coast',
        countryCodes: ['225'],
    },
    {
        country: 'Jamaica',
        countryCodes: ['1-876'],
    },
    {
        country: 'Japan',
        countryCodes: ['81'],
    },
    {
        country: 'Jersey',
        countryCodes: ['44-1534'],
    },
    {
        country: 'Jordan',
        countryCodes: ['962'],
    },
    {
        country: 'Kazakhstan',
        countryCodes: ['7'],
    },
    {
        country: 'Kenya',
        countryCodes: ['254'],
    },
    {
        country: 'Kiribati',
        countryCodes: ['686'],
    },
    {
        country: 'Kosovo',
        countryCodes: ['383'],
    },
    {
        country: 'Kuwait',
        countryCodes: ['965'],
    },
    {
        country: 'Kyrgyzstan',
        countryCodes: ['996'],
    },
    {
        country: 'Laos',
        countryCodes: ['856'],
    },
    {
        country: 'Latvia',
        countryCodes: ['371'],
    },
    {
        country: 'Lebanon',
        countryCodes: ['961'],
    },
    {
        country: 'Lesotho',
        countryCodes: ['266'],
    },
    {
        country: 'Liberia',
        countryCodes: ['231'],
    },
    {
        country: 'Libya',
        countryCodes: ['218'],
    },
    {
        country: 'Liechtenstein',
        countryCodes: ['423'],
    },
    {
        country: 'Lithuania',
        countryCodes: ['370'],
    },
    {
        country: 'Luxembourg',
        countryCodes: ['352'],
    },
    {
        country: 'Macau',
        countryCodes: ['853'],
    },
    {
        country: 'Macedonia',
        countryCodes: ['389'],
    },
    {
        country: 'Madagascar',
        countryCodes: ['261'],
    },
    {
        country: 'Malawi',
        countryCodes: ['265'],
    },
    {
        country: 'Malaysia',
        countryCodes: ['60'],
    },
    {
        country: 'Maldives',
        countryCodes: ['960'],
    },
    {
        country: 'Mali',
        countryCodes: ['223'],
    },
    {
        country: 'Malta',
        countryCodes: ['356'],
    },
    {
        country: 'Marshall Islands',
        countryCodes: ['692'],
    },
    {
        country: 'Mauritania',
        countryCodes: ['222'],
    },
    {
        country: 'Mauritius',
        countryCodes: ['230'],
    },
    {
        country: 'Mayotte',
        countryCodes: ['262'],
    },
    {
        country: 'Mexico',
        countryCodes: ['52'],
    },
    {
        country: 'Micronesia',
        countryCodes: ['691'],
    },
    {
        country: 'Moldova',
        countryCodes: ['373'],
    },
    {
        country: 'Monaco',
        countryCodes: ['377'],
    },
    {
        country: 'Mongolia',
        countryCodes: ['976'],
    },
    {
        country: 'Montenegro',
        countryCodes: ['382'],
    },
    {
        country: 'Montserrat',
        countryCodes: ['1-664'],
    },
    {
        country: 'Morocco',
        countryCodes: ['212'],
    },
    {
        country: 'Mozambique',
        countryCodes: ['258'],
    },
    {
        country: 'Myanmar',
        countryCodes: ['95'],
    },
    {
        country: 'Namibia',
        countryCodes: ['264'],
    },
    {
        country: 'Nauru',
        countryCodes: ['674'],
    },
    {
        country: 'Nepal',
        countryCodes: ['977'],
    },
    {
        country: 'Netherlands',
        countryCodes: ['31'],
    },
    {
        country: 'Netherlands Antilles',
        countryCodes: ['599'],
    },
    {
        country: 'New Caledonia',
        countryCodes: ['687'],
    },
    {
        country: 'New Zealand',
        countryCodes: ['64'],
    },
    {
        country: 'Nicaragua',
        countryCodes: ['505'],
    },
    {
        country: 'Niger',
        countryCodes: ['227'],
    },
    {
        country: 'Nigeria',
        countryCodes: ['234'],
    },
    {
        country: 'Niue',
        countryCodes: ['683'],
    },
    {
        country: 'North Korea',
        countryCodes: ['850'],
    },
    {
        country: 'Northern Mariana Islands',
        countryCodes: ['1-670'],
    },
    {
        country: 'Norway',
        countryCodes: ['47'],
    },
    {
        country: 'Oman',
        countryCodes: ['968'],
    },
    {
        country: 'Pakistan',
        countryCodes: ['92'],
    },
    {
        country: 'Palau',
        countryCodes: ['680'],
    },
    {
        country: 'Palestine',
        countryCodes: ['970'],
    },
    {
        country: 'Panama',
        countryCodes: ['507'],
    },
    {
        country: 'Papua New Guinea',
        countryCodes: ['675'],
    },
    {
        country: 'Paraguay',
        countryCodes: ['595'],
    },
    {
        country: 'Peru',
        countryCodes: ['51'],
    },
    {
        country: 'Philippines',
        countryCodes: ['63'],
    },
    {
        country: 'Pitcairn',
        countryCodes: ['64'],
    },
    {
        country: 'Poland',
        countryCodes: ['48'],
    },
    {
        country: 'Portugal',
        countryCodes: ['351'],
    },
    {
        country: 'Puerto Rico',
        countryCodes: ['1-787', '1-939'],
    },
    {
        country: 'Qatar',
        countryCodes: ['974'],
    },
    {
        country: 'Republic of the Congo',
        countryCodes: ['242'],
    },
    {
        country: 'Reunion',
        countryCodes: ['262'],
    },
    {
        country: 'Romania',
        countryCodes: ['40'],
    },
    {
        country: 'Russia',
        countryCodes: ['7'],
    },
    {
        country: 'Rwanda',
        countryCodes: ['250'],
    },
    {
        country: 'Saint Barthelemy',
        countryCodes: ['590'],
    },
    {
        country: 'Saint Helena',
        countryCodes: ['290'],
    },
    {
        country: 'Saint Kitts and Nevis',
        countryCodes: ['1-869'],
    },
    {
        country: 'Saint Lucia',
        countryCodes: ['1-758'],
    },
    {
        country: 'Saint Martin',
        countryCodes: ['590'],
    },
    {
        country: 'Saint Pierre and Miquelon',
        countryCodes: ['508'],
    },
    {
        country: 'Saint Vincent and the Grenadines',
        countryCodes: ['1-784'],
    },
    {
        country: 'Samoa',
        countryCodes: ['685'],
    },
    {
        country: 'San Marino',
        countryCodes: ['378'],
    },
    {
        country: 'Sao Tome and Principe',
        countryCodes: ['239'],
    },
    {
        country: 'Saudi Arabia',
        countryCodes: ['966'],
    },
    {
        country: 'Senegal',
        countryCodes: ['221'],
    },
    {
        country: 'Serbia',
        countryCodes: ['381'],
    },
    {
        country: 'Seychelles',
        countryCodes: ['248'],
    },
    {
        country: 'Sierra Leone',
        countryCodes: ['232'],
    },
    {
        country: 'Singapore',
        countryCodes: ['65'],
    },
    {
        country: 'Sint Maarten',
        countryCodes: ['1-721'],
    },
    {
        country: 'Slovakia',
        countryCodes: ['421'],
    },
    {
        country: 'Slovenia',
        countryCodes: ['386'],
    },
    {
        country: 'Solomon Islands',
        countryCodes: ['677'],
    },
    {
        country: 'Somalia',
        countryCodes: ['252'],
    },
    {
        country: 'South Africa',
        countryCodes: ['27'],
    },
    {
        country: 'South Korea',
        countryCodes: ['82'],
    },
    {
        country: 'South Sudan',
        countryCodes: ['211'],
    },
    {
        country: 'Spain',
        countryCodes: ['34'],
    },
    {
        country: 'Sri Lanka',
        countryCodes: ['94'],
    },
    {
        country: 'Sudan',
        countryCodes: ['249'],
    },
    {
        country: 'Suriname',
        countryCodes: ['597'],
    },
    {
        country: 'Svalbard and Jan Mayen',
        countryCodes: ['47'],
    },
    {
        country: 'Swaziland',
        countryCodes: ['268'],
    },
    {
        country: 'Sweden',
        countryCodes: ['46'],
    },
    {
        country: 'Switzerland',
        countryCodes: ['41'],
    },
    {
        country: 'Syria',
        countryCodes: ['963'],
    },
    {
        country: 'Taiwan',
        countryCodes: ['886'],
    },
    {
        country: 'Tajikistan',
        countryCodes: ['992'],
    },
    {
        country: 'Tanzania',
        countryCodes: ['255'],
    },
    {
        country: 'Thailand',
        countryCodes: ['66'],
    },
    {
        country: 'Togo',
        countryCodes: ['228'],
    },
    {
        country: 'Tokelau',
        countryCodes: ['690'],
    },
    {
        country: 'Tonga',
        countryCodes: ['676'],
    },
    {
        country: 'Trinidad and Tobago',
        countryCodes: ['1-868'],
    },
    {
        country: 'Tunisia',
        countryCodes: ['216'],
    },
    {
        country: 'Turkey',
        countryCodes: ['90'],
    },
    {
        country: 'Turkmenistan',
        countryCodes: ['993'],
    },
    {
        country: 'Turks and Caicos Islands',
        countryCodes: ['1-649'],
    },
    {
        country: 'Tuvalu',
        countryCodes: ['688'],
    },
    {
        country: 'U.S. Virgin Islands',
        countryCodes: ['1-340'],
    },
    {
        country: 'Uganda',
        countryCodes: ['256'],
    },
    {
        country: 'Ukraine',
        countryCodes: ['380'],
    },
    {
        country: 'United Arab Emirates',
        countryCodes: ['971'],
    },
    {
        country: 'United Kingdom',
        countryCodes: ['44'],
    },
    {
        country: 'United States',
        countryCodes: ['1'],
    },
    {
        country: 'Uruguay',
        countryCodes: ['598'],
    },
    {
        country: 'Uzbekistan',
        countryCodes: ['998'],
    },
    {
        country: 'Vanuatu',
        countryCodes: ['678'],
    },
    {
        country: 'Vatican',
        countryCodes: ['379'],
    },
    {
        country: 'Venezuela',
        countryCodes: ['58'],
    },
    {
        country: 'Wallis and Futuna',
        countryCodes: ['681'],
    },
    {
        country: 'Western Sahara',
        countryCodes: ['212'],
    },
    {
        country: 'Yemen',
        countryCodes: ['967'],
    },
    {
        country: 'Zambia',
        countryCodes: ['260'],
    },
    {
        country: 'Zimbabwe',
        countryCodes: ['263'],
    },
];

export default codes