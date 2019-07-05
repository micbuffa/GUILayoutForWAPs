// quadecho
window.onload = init;
let ASSETS_PATH = "./img";

function init() {
  var wapdiv = document.querySelector("#wap");
  wapdiv.innerHTML = "";
  //var res = Layout.calcLayout(distorsionUI);
  //var res = Layout.calcLayout(flangerUI);
  //var res = Layout.calcLayout(freeVerbUI);
  //var res = Layout.calcLayout(quadEchoUI);
  //var res = Layout.calcLayout(faustUI2);
  //var res = Layout.calcLayout(faustUI3);
  //var res = Layout.calcLayout(pitchShifterUI);
  //var res = Layout.calcLayout(flangerUI);
  //var res = Layout.calcLayout(compressorUI);
  var res = Layout.calcLayout(phaserUI);
  //var res = Layout.calcLayout(blipperUI);
  console.dir(res);
  // calcul du scale factor
  scaleFactorY = realHeight / res.layout.height;
  scaleFactorX = realWidth / res.layout.width;

  renderUsingWebAudioControls(wapdiv, res.ui);
}
var blipperUI = [
  {
    type: "vgroup",
    label: "echo",
    items: [
      {
        type: "hslider",
        label: "BasePitch",
        address: "/echo/BasePitch",
        index: "80",
        meta: [{ OWL: "PARAMETER_A" }, { unit: "semitones" }],
        init: "60",
        min: "24",
        max: "96",
        step: "0.1"
      },
      {
        type: "hslider",
        label: "Mix",
        address: "/echo/Mix",
        index: "20",
        meta: [{ OWL: "PARAMETER_D" }],
        init: "0.5",
        min: "0",
        max: "1",
        step: "0.01"
      },
      {
        type: "hslider",
        label: "PitchMod",
        address: "/echo/PitchMod",
        index: "92",
        meta: [{ OWL: "PARAMETER_B" }, { unit: "semitones" }],
        init: "24",
        min: "-64",
        max: "64",
        step: "1"
      },
      {
        type: "hslider",
        label: "Release",
        address: "/echo/Release",
        index: "48",
        meta: [{ OWL: "PARAMETER_C" }, { unit: "ms" }],
        init: "20",
        min: "2",
        max: "100",
        step: "1"
      },
      {
        type: "checkbox",
        label: "bypass",
        address: "/echo/bypass",
        index: "40"
      }
    ]
  }
];
var phaserUI = [
  {
    type: "vgroup",
    label: "PHASER2",
    meta: [
      {
        tooltip: "Reference: https://ccrma.stanford.edu/~jos/pasp/Flanging.html"
      }
    ],
    items: [
      {
        type: "hgroup",
        label: "0x00",
        meta: [{ "0": "" }],
        items: [
          {
            type: "checkbox",
            label: "Bypass",
            address: "/PHASER2/0x00/Bypass",
            index: "0",
            meta: [
              { "0": "" },
              { tooltip: "When this is checked, the phaser has no effect" }
            ]
          },
          {
            type: "checkbox",
            label: "Invert Internal Phaser Sum",
            address: "/PHASER2/0x00/Invert_Internal_Phaser_Sum",
            index: "136",
            meta: [{ "1": "" }]
          },
          {
            type: "checkbox",
            label: "Vibrato Mode",
            address: "/PHASER2/0x00/Vibrato_Mode",
            index: "8",
            meta: [{ "2": "" }]
          }
        ]
      },
      {
        type: "hgroup",
        label: "0x00",
        meta: [{ "1": "" }],
        items: [
          {
            type: "hslider",
            label: "Speed",
            address: "/PHASER2/0x00/Speed",
            index: "60",
            meta: [{ "1": "" }, { style: "knob" }, { unit: "Hz" }],
            init: "0.5",
            min: "0",
            max: "10",
            step: "0.001"
          },
          {
            type: "hslider",
            label: "Notch Depth",
            address: "/PHASER2/0x00/Notch_Depth_(Intensity)",
            index: "12",
            meta: [{ "2": "" }, { style: "knob" }],
            init: "1",
            min: "0",
            max: "1",
            step: "0.001"
          },
          {
            type: "hslider",
            label: "Feedback Gain",
            address: "/PHASER2/0x00/Feedback_Gain",
            index: "32",
            meta: [{ "3": "" }, { style: "knob" }],
            init: "0",
            min: "-0.999",
            max: "0.999",
            step: "0.001"
          }
        ]
      },
      {
        type: "hgroup",
        label: "0x00",
        meta: [{ "2": "" }],
        items: [
          {
            type: "hslider",
            label: "Notch width",
            address: "/PHASER2/0x00/Notch_width",
            index: "28",
            meta: [
              { "1": "" },
              { scale: "log" },
              { style: "knob" },
              { unit: "Hz" }
            ],
            init: "1000",
            min: "10",
            max: "5000",
            step: "1"
          },
          {
            type: "hslider",
            label: "Min Notch1 Freq",
            address: "/PHASER2/0x00/Min_Notch1_Freq",
            index: "52",
            meta: [
              { "2": "" },
              { scale: "log" },
              { style: "knob" },
              { unit: "Hz" }
            ],
            init: "100",
            min: "20",
            max: "5000",
            step: "1"
          },
          {
            type: "hslider",
            label: "Max Notch1 Freq",
            address: "/PHASER2/0x00/Max_Notch1_Freq",
            index: "56",
            meta: [
              { "3": "" },
              { scale: "log" },
              { style: "knob" },
              { unit: "Hz" }
            ],
            init: "800",
            min: "20",
            max: "10000",
            step: "1"
          },
          {
            type: "hslider",
            label: "Notch Freq Ratio",
            address:
              "/PHASER2/0x00/Notch_Freq_Ratio:_NotchFreq(n 1)/NotchFreq(n)",
            index: "44",
            meta: [{ "4": "" }, { style: "knob" }],
            init: "1.5",
            min: "1.1",
            max: "4",
            step: "0.001"
          }
        ]
      },
      {
        type: "hgroup",
        label: "0x00",
        meta: [{ "3": "" }],
        items: [
          {
            type: "hslider",
            label: "Phaser Output Level",
            address: "/PHASER2/0x00/Phaser_Output_Level",
            index: "4",
            meta: [{ unit: "dB" }],
            init: "0",
            min: "-60",
            max: "10",
            step: "0.1"
          }
        ]
      }
    ]
  }
];
var compressorUI = [
  {
    type: "vgroup",
    label: "COMPRESSOR",
    meta: [
      {
        tooltip:
          "Reference: http://en.wikipedia.org/wiki/Dynamic_range_compression"
      }
    ],
    items: [
      {
        type: "hgroup",
        label: "0x00",
        meta: [{ "0": "" }],
        items: [
          {
            type: "checkbox",
            label: "Bypass",
            address: "/COMPRESSOR/0x00/Bypass",
            index: "0",
            meta: [
              { "0": "" },
              { tooltip: "When this is checked, the compressor has no effect" }
            ]
          },
          {
            type: "hbargraph",
            label: "Compressor Gain",
            address: "/COMPRESSOR/0x00/Compressor_Gain",
            index: "88",
            meta: [
              { "1": "" },
              { tooltip: "Current gain of the compressor in dB" },
              { unit: "dB" }
            ],
            min: "-50",
            max: "10"
          }
        ]
      },
      {
        type: "hgroup",
        label: "0x00",
        meta: [{ "1": "" }],
        items: [
          {
            type: "hgroup",
            label: "Compression Control",
            meta: [{ "3": "" }],
            items: [
              {
                type: "hslider",
                label: "Ratio",
                address: "/COMPRESSOR/0x00/Compression_Control/Ratio",
                index: "28",
                meta: [
                  { "0": "" },
                  { style: "knob" },
                  {
                    tooltip:
                      "A compression Ratio of N means that for each N dB increase in input signal level above Threshold, the output level goes up 1 dB"
                  }
                ],
                init: "5",
                min: "1",
                max: "20",
                step: "0.1"
              },
              {
                type: "hslider",
                label: "Threshold",
                address: "/COMPRESSOR/0x00/Compression_Control/Threshold",
                index: "52",
                meta: [
                  { "1": "" },
                  { style: "knob" },
                  {
                    tooltip:
                      "When the signal level exceeds the Threshold (in dB), its level is compressed according to the Ratio"
                  },
                  { unit: "dB" }
                ],
                init: "-30",
                min: "-100",
                max: "10",
                step: "0.1"
              }
            ]
          },
          {
            type: "hgroup",
            label: "Compression Response",
            meta: [{ "4": "" }],
            items: [
              {
                type: "hslider",
                label:
                  "Attack tooltip: Time constant in ms (1/e smoothing time) for the compression gain to approach (exponentially) a new lower target level (the compression `kicking in_)]",
                address:
                  "/COMPRESSOR/0x00/Compression_Response/Attack_____tooltip:_Time_constant_in_ms_(1/e_smoothing_time)_for_the_compression_gain__to_approach_(exponentially)_a_new_lower_target_level_(the_compression__`kicking_in_)]",
                index: "24",
                meta: [
                  { "1": "" },
                  { scale: "log" },
                  { style: "knob" },
                  { unit: "ms" }
                ],
                init: "50",
                min: "1",
                max: "1000",
                step: "0.1"
              },
              {
                type: "hslider",
                label: "Release",
                address: "/COMPRESSOR/0x00/Compression_Response/Release",
                index: "32",
                meta: [
                  { "2": "" },
                  { scale: "log" },
                  { style: "knob" },
                  {
                    tooltip:
                      "Time constant in ms (1/e smoothing time) for the compression gain to approach (exponentially) a new higher target level (the compression _releasing_)"
                  },
                  { unit: "ms" }
                ],
                init: "500",
                min: "1",
                max: "1000",
                step: "0.1"
              }
            ]
          }
        ]
      },
      {
        type: "hslider",
        label: "Makeup Gain",
        address: "/COMPRESSOR/Makeup_Gain",
        index: "4",
        meta: [
          { "5": "" },
          {
            tooltip:
              "The compressed-signal output level is increased by this amount (in dB) to make up for the level lost due to compression"
          },
          { unit: "dB" }
        ],
        init: "40",
        min: "-96",
        max: "96",
        step: "0.1"
      }
    ]
  }
];

var distorsionUI = [
  {
    type: "vgroup",
    label: "CUBIC NONLINEARITY cubicnl",
    meta: [
      {
        tooltip:
          "Reference: https://ccrma.stanford.edu/~jos/pasp/Cubic_Soft_Clipper.html"
      }
    ],
    items: [
      {
        type: "checkbox",
        label: "Bypass",
        address: "/CUBIC_NONLINEARITY_cubicnl/Bypass",
        index: "0",
        meta: [
          { "0": "" },
          { tooltip: "When this is checked, the nonlinearity has no effect" }
        ]
      },
      {
        type: "hslider",
        label: "Drive",
        address: "/CUBIC_NONLINEARITY_cubicnl/Drive",
        index: "16",
        meta: [{ "1": "" }, { tooltip: "Amount of distortion" }],
        init: "0",
        min: "0",
        max: "1",
        step: "0.01"
      },
      {
        type: "hslider",
        label: "Offset",
        address: "/CUBIC_NONLINEARITY_cubicnl/Offset",
        index: "4",
        meta: [{ "2": "" }, { tooltip: "Brings in even harmonics" }],
        init: "0",
        min: "0",
        max: "1",
        step: "0.01"
      }
    ]
  }
];
var flangerUI = [
  {
    type: "vgroup",
    label: "FLANGER",
    meta: [
      {
        tooltip: "Reference: https://ccrma.stanford.edu/~jos/pasp/Flanging.html"
      }
    ],
    items: [
      {
        type: "hgroup",
        label: "0x00",
        meta: [{ "0": "" }],
        items: [
          {
            type: "checkbox",
            label: "Bypass",
            address: "/FLANGER/0x00/Bypass",
            index: "0",
            meta: [
              { "0": "" },
              { tooltip: "When this is checked, the flanger has no effect" }
            ]
          },
          {
            type: "checkbox",
            label: "Invert Flange Sum",
            address: "/FLANGER/0x00/Invert_Flange_Sum",
            index: "16460",
            meta: [{ "1": "" }]
          },
          {
            type: "hbargraph",
            label: "Flange LFO",
            address: "/FLANGER/0x00/Flange_LFO",
            index: "48",
            meta: [
              { "2": "" },
              { style: "led" },
              { tooltip: "Display sum of flange delays" }
            ],
            min: "-1.5",
            max: "1.5"
          }
        ]
      },
      {
        type: "hgroup",
        label: "0x00",
        meta: [{ "1": "" }],
        items: [
          {
            type: "hslider",
            label: "Speed",
            address: "/FLANGER/0x00/Speed",
            index: "20",
            meta: [{ "1": "" }, { style: "knob" }, { unit: "Hz" }],
            init: "0.5",
            min: "0",
            max: "10",
            step: "0.01"
          },
          {
            type: "hslider",
            label: "Depth",
            address: "/FLANGER/0x00/Depth",
            index: "16464",
            meta: [{ "2": "" }, { style: "knob" }],
            init: "1",
            min: "0",
            max: "1",
            step: "0.001"
          },
          {
            type: "hslider",
            label: "Feedback",
            address: "/FLANGER/0x00/Feedback",
            index: "52",
            meta: [{ "3": "" }, { style: "knob" }],
            init: "0",
            min: "-0.999",
            max: "0.999",
            step: "0.001"
          }
        ]
      },
      {
        type: "hgroup",
        label: "Delay Controls",
        meta: [{ "2": "" }],
        items: [
          {
            type: "hslider",
            label: "Flange Delay",
            address: "/FLANGER/Delay_Controls/Flange_Delay",
            index: "16448",
            meta: [{ "1": "" }, { style: "knob" }, { unit: "ms" }],
            init: "10",
            min: "0",
            max: "20",
            step: "0.001"
          },
          {
            type: "hslider",
            label: "Delay Offset",
            address: "/FLANGER/Delay_Controls/Delay_Offset",
            index: "16444",
            meta: [{ "2": "" }, { style: "knob" }, { unit: "ms" }],
            init: "1",
            min: "0",
            max: "20",
            step: "0.001"
          }
        ]
      },
      {
        type: "hgroup",
        label: "0x00",
        meta: [{ "3": "" }],
        items: [
          {
            type: "hslider",
            label: "Flanger Output Level",
            address: "/FLANGER/0x00/Flanger_Output_Level",
            index: "4",
            meta: [{ unit: "dB" }],
            init: "0",
            min: "-60",
            max: "10",
            step: "0.1"
          }
        ]
      }
    ]
  }
];
var freeVerbUI = [
  {
    type: "hgroup",
    label: "Freeverb",
    items: [
      {
        type: "vgroup",
        label: "0x00",
        meta: [{ "0": "" }],
        items: [
          {
            type: "vslider",
            label: "Damp",
            address: "/Freeverb/0x00/Damp",
            index: "20",
            meta: [
              { "0": "" },
              { style: "knob" },
              { tooltip: "Somehow control the density of the reverb." }
            ],
            init: "0.5",
            min: "0",
            max: "1",
            step: "0.025"
          },
          {
            type: "vslider",
            label: "RoomSize",
            address: "/Freeverb/0x00/RoomSize",
            index: "12",
            meta: [
              { "1": "" },
              { style: "knob" },
              {
                tooltip:
                  "The room size between 0 and 1 with 1 for the largest room."
              }
            ],
            init: "0.5",
            min: "0",
            max: "1",
            step: "0.025"
          },
          {
            type: "vslider",
            label: "Stereo Spread",
            address: "/Freeverb/0x00/Stereo_Spread",
            index: "323852",
            meta: [
              { "2": "" },
              { style: "knob" },
              {
                tooltip:
                  "Spatial spread between 0 and 1 with 1 for maximum spread."
              }
            ],
            init: "0.5",
            min: "0",
            max: "1",
            step: "0.01"
          }
        ]
      },
      {
        type: "vslider",
        label: "Wet",
        address: "/Freeverb/Wet",
        index: "32",
        meta: [
          { "1": "" },
          {
            tooltip:
              "The amount of reverb applied to the signal between 0 and 1 with 1 for the maximum amount of reverb."
          }
        ],
        init: "0.3333",
        min: "0",
        max: "1",
        step: "0.025"
      }
    ]
  }
];

var quadEchoUI = [
  {
    type: "vgroup",
    label: "stereo echo",
    items: [
      {
        type: "vgroup",
        label: "echo 1000",
        items: [
          {
            type: "hslider",
            label: "feedback",
            address: "/stereo_echo/echo__1000/feedback",
            index: "0",
            init: "0",
            min: "0",
            max: "100",
            step: "0.1"
          },
          {
            type: "hslider",
            label: "millisecond",
            address: "/stereo_echo/echo__1000/millisecond",
            index: "12",
            init: "0",
            min: "0",
            max: "1000",
            step: "0.1"
          }
        ]
      }
    ]
  }
];

var faustUI2 = [
  {
    type: "hgroup",
    label: "flangerForBrowser",
    items: [
      {
        type: "hgroup",
        label: "Effects",
        meta: [{ "1": "" }],
        items: [
          {
            type: "hgroup",
            label: "Flanger",
            meta: [{ "5": "" }],
            items: [
              {
                type: "vgroup",
                label: "Knobs",
                meta: [{ "0": "" }],
                items: [
                  {
                    type: "vslider",
                    label: "Delay",
                    address: "/flangerForBrowser/Effects/Flanger/Knobs/Delay",
                    index: "16476",
                    meta: [{ "1": "" }, { midi: "ctrl 50" }, { style: "knob" }],
                    init: "0.22",
                    min: "0",
                    max: "1",
                    step: "1"
                  },
                  {
                    type: "vslider",
                    label: "Rate",
                    address: "/flangerForBrowser/Effects/Flanger/Knobs/Rate",
                    index: "36",
                    meta: [
                      { "1": "" },
                      { midi: "ctrl 2" },
                      { style: "knob" },
                      { unit: "Hz" }
                    ],
                    init: "0.5",
                    min: "0",
                    max: "10",
                    step: "0.01"
                  },
                  {
                    type: "vslider",
                    label: "Depth",
                    address: "/flangerForBrowser/Effects/Flanger/Knobs/Depth",
                    index: "16492",
                    meta: [{ "3": "" }, { midi: "ctrl 3" }, { style: "knob" }],
                    init: "0.75",
                    min: "0",
                    max: "1",
                    step: "0.001"
                  },
                  {
                    type: "vslider",
                    label: "Feedback",
                    address:
                      "/flangerForBrowser/Effects/Flanger/Knobs/Feedback",
                    index: "76",
                    meta: [{ "5": "" }, { midi: "ctrl 4" }, { style: "knob" }],
                    init: "0",
                    min: "-0.995",
                    max: "0.99",
                    step: "0.001"
                  },
                  {
                    type: "vslider",
                    label: "Waveshape",
                    address:
                      "/flangerForBrowser/Effects/Flanger/Knobs/Waveshape",
                    index: "12",
                    meta: [{ "7": "" }, { midi: "ctrl 54" }, { style: "knob" }],
                    init: "0",
                    min: "0",
                    max: "1",
                    step: "0.001"
                  }
                ]
              },
              {
                type: "vgroup",
                label: "Switches",
                meta: [{ "1": "" }],
                items: [
                  {
                    type: "vslider",
                    label: "Enable",
                    address:
                      "/flangerForBrowser/Effects/Flanger/Switches/Enable",
                    index: "8",
                    meta: [
                      { "0": "" },
                      { midi: "ctrl 105" },
                      { style: "knob" }
                    ],
                    init: "0",
                    min: "0",
                    max: "1",
                    step: "1"
                  },
                  {
                    type: "vslider",
                    label: "Invert",
                    address:
                      "/flangerForBrowser/Effects/Flanger/Switches/Invert",
                    index: "16488",
                    meta: [{ "1": "" }, { midi: "ctrl 49" }, { style: "knob" }],
                    init: "0",
                    min: "0",
                    max: "1",
                    step: "1"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// deadgate
var faustUI3 = [
  {
    type: "vgroup",
    label: "deadgate",
    items: [
      {
        type: "vslider",
        label: "Dead Zone",
        address: "/deadgate/Dead_Zone",
        index: "44",
        init: "-120",
        min: "-120",
        max: "0",
        step: "0.001"
      },
      {
        type: "vslider",
        label: "Noise Gate",
        address: "/deadgate/Noise_Gate",
        index: "380",
        init: "-120",
        min: "-120",
        max: "0",
        step: "0.001"
      }
    ]
  }
];

var pitchShifterUI = [
  {
    type: "vgroup",
    label: "Pitch Shifter",
    items: [
      {
        type: "hslider",
        label: "shift (semitones)",
        address: "/Pitch_Shifter/shift_(semitones)",
        index: "524296",
        init: "0",
        min: "-12",
        max: "12",
        step: "0.1"
      },
      {
        type: "hslider",
        label: "window (samples)",
        address: "/Pitch_Shifter/window_(samples)",
        index: "524292",
        init: "1000",
        min: "50",
        max: "10000",
        step: "1"
      },
      {
        type: "hslider",
        label: "xfade (samples)",
        address: "/Pitch_Shifter/xfade_(samples)",
        index: "524308",
        init: "10",
        min: "1",
        max: "10000",
        step: "1"
      }
    ]
  }
];
var realHeight = 400;
var realWidth = 300;
var scaleFactorX = (scaleFactorY = 1);

function createGroupHTML(group) {
  groupdiv = document.createElement("div");
  groupdiv.id = group.label;
  groupdiv.style.top = group.layout.top * scaleFactorY + "px";
  groupdiv.style.left = group.layout.left * scaleFactorX + "px";
  groupdiv.style.position = "absolute";
  groupdiv.style.display = "block";
  groupdiv.style.margin = "0px 0px 0px 0px";
  groupdiv.style.height = group.layout.height * scaleFactorY + "px";
  groupdiv.style.width = group.layout.width * scaleFactorX + "px";
  groupdiv.style.border = "2px solid red";

  return groupdiv;
}

function createSlider(slider, orientation) {
  // un knob a un label, on crée donc un div avec le knob et le label
  let sliderContainer = document.createElement("div");
  sliderContainer.style.top = slider.layout.top * scaleFactorY + "px";
  sliderContainer.style.left =
    2 * slider.layout.left * scaleFactorX * 0.35 + "px";
  sliderContainer.style.position = "absolute";
  //sliderContainer.height = slider.layout.width * scaleFactorY;
  //sliderContainer.width = slider.layout.width * scaleFactorX;
  sliderContainer.style.border = "1px dashed black";
  sliderContainer.style.position = "absolute";
  if (orientation == "vert")
    sliderContainer.style.height = slider.layout.height * scaleFactorY + "px";
  else sliderContainer.style.width = slider.layout.width * scaleFactorX + "px";

  sliderElem = document.createElement("webaudio-slider");
  sliderElem.setAttribute("value", slider.init);
  sliderElem.setAttribute("tooltip", slider.label + " %d");
  sliderElem.setAttribute("direction", orientation);

  //sliderElem.setAttribute("width", slider.layout.width * scaleFactor);
  sliderElem.style.border = "1px dashed orange";
  sliderElem.setAttribute("width", (slider.layout.width * scaleFactorX) / 2);

  if (orientation == "vert") {
    sliderElem.style.left =
      (slider.layout.width * scaleFactorX - 24) / 2 + "px";
    sliderElem.style.top =
      (slider.layout.height * scaleFactorY -
        (slider.layout.width * scaleFactorX) / 2) /
        2 +
      "px";
  } else
    sliderElem.style.left =
      (slider.layout.width * scaleFactorX -
        (slider.layout.width * scaleFactorX) / 2) /
        2 +
      "px";

  //sliderElem.setAttribute("height", slider.height);
  //sliderElem.setAttribute("width", slider.width);
  sliderElem.setAttribute("max", slider.max);
  sliderElem.setAttribute("min", slider.min);
  sliderElem.setAttribute("step", slider.step);
  //console.log("pedal.js SLIDER STEP = " + slider.step);

  sliderElem.src = ASSETS_PATH + "/sliders/" + slider.model;
  sliderElem.setAttribute("src", ASSETS_PATH + "/sliders/slider1.png");
  sliderElem.setAttribute("knobsrc", ASSETS_PATH + "/sliders/sliderKnob.png");

  sliderContainer.appendChild(sliderElem);

  let labelElem = document.createElement("div");
  labelElem.innerHTML = slider.label;
  labelElem.setAttribute("style", "text-align:center");
  sliderContainer.appendChild(labelElem);

  return sliderContainer;
}
function createKnob(knob) {
  // un knob a un label, on crée donc un div avec le knob et le label
  let knobContainer = document.createElement("div");
  knobContainer.style.top = knob.layout.top * scaleFactorY + "px";
  knobContainer.style.left = knob.layout.left * scaleFactorX + "px";
  knobContainer.style.position = "absolute";
  knobContainer.height = knob.layout.width * scaleFactorY;
  knobContainer.width = knob.layout.width * scaleFactorX;
  knobContainer.style.border = "1px dashed black";

  var knobElem = document.createElement("webaudio-knob");
  knobElem.setAttribute("src", ASSETS_PATH + "/knobs/MiniMoog_Main.png");
  // taille de base d'un bouton = 64x64
  // PRENDRE LA TAILLE LA PLUS PETITE PAS TOUJOURS SCALEFACTORY et width
  knobElem.setAttribute("height", knob.layout.width * scaleFactorY * 1);
  knobElem.setAttribute("width", knob.layout.width * scaleFactorY * 1);
  knobElem.setAttribute("sprites", 100);
  knobElem.setAttribute("min", knob.min);
  knobElem.setAttribute("max", knob.max);
  knobElem.setAttribute("step", knob.step);
  knobContainer.appendChild(knobElem);

  let labelElem = document.createElement("div");
  labelElem.innerHTML = knob.label;
  labelElem.setAttribute("style", "text-align:center");
  knobContainer.appendChild(labelElem);

  return knobContainer;
}

function createCheckbox(checkbox) {
  // un knob a un label, on crée donc un div avec le knob et le label
  let checkboxContainer = document.createElement("div");
  checkboxContainer.style.top = checkbox.layout.top * scaleFactorY + "px";
  checkboxContainer.style.left = checkbox.layout.left * scaleFactorX + "px";
  checkboxContainer.style.position = "absolute";
  //checkboxContainer.style.height = checkbox.layout.width * scaleFactorX + "px";
  //checkboxContainer.style.width = checkbox.layout.width * scaleFactorX + "px";
  checkboxContainer.style.border = "1px dashed black";
  checkboxContainer.style.display = "block";

  var checkboxElem = document.createElement("webaudio-switch");
  checkboxElem.setAttribute("src", ASSETS_PATH + "/knobs/switch_2.png");
  // taille de base d'un bouton = 64x64
  // PRENDRE LA TAILLE LA PLUS PETITE PAS TOUJOURS SCALEFACTORY et width
  checkboxElem.setAttribute(
    "height",
    checkbox.layout.width * scaleFactorX * 0.7
  );
  checkboxElem.setAttribute("width", checkbox.layout.width * scaleFactorX);
  checkboxElem.setAttribute("sprites", 100);
  checkboxContainer.appendChild(checkboxElem);

  let labelElem = document.createElement("div");
  labelElem.innerHTML = checkbox.label;
  labelElem.setAttribute("style", "text-align:center");
  checkboxContainer.appendChild(labelElem);

  return checkboxContainer;
}

function checkIfKnob(slider) {
  if (!slider.meta) return false;

  let isKnob = false;
  slider.meta.forEach(att => {
    if (att.style) {
      if (att.style === "knob") isKnob = true;
    }
  });
  return isKnob;
}
function renderUsingWebAudioControls(parent, ui) {
  var group;
  var items;
  var slider, knob;

  for (var i = 0; i < ui.length; i++) {
    switch (ui[i].type) {
      case "vgroup":
        group = ui[i];
        console.log("found vgroup label = " + group.label);
        var groupdiv = createGroupHTML(group);

        parent.append(groupdiv);

        parse(groupdiv, group.items);
        break;
      case "hgroup":
        group = ui[i];

        console.log("found hgroup label = " + group.label);
        var groupdiv = createGroupHTML(group);

        parent.append(groupdiv);

        parse(groupdiv, group.items);
        break;
      case "hslider":
        slider = ui[i];
        console.log("found hslider label = " + slider.label);
        if (checkIfKnob(slider)) {
          knob = createKnob(slider);
          parent.append(knob);
        } else {
          slider = createSlider(slider, "horz");
          parent.append(slider);
        }

        break;
      case "vslider":
        slider = ui[i];
        console.log("found vslider label = " + slider.label);

        if (checkIfKnob(slider)) {
          knob = createKnob(slider);
          parent.append(knob);
        } else {
          slider = createSlider(slider, "vert");
          parent.append(slider);
        }
        break;
      case "checkbox":
        checkbox = ui[i];
        console.log("CHECKBOX");
        checkbox = createCheckbox(checkbox);
        parent.append(checkbox);
        break;
    }
  }
}
