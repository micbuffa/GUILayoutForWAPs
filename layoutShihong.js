class Layout {
  static predictType(item) {
    if (
      item.type === "vgroup" ||
      item.type === "hgroup" ||
      item.type === "tgroup" ||
      item.type === "button" ||
      item.type === "checkbox"
    )
      return item.type;

    if (item.type === "hbargraph" || item.type === "vbargraph") {
      if (
        item.meta &&
        item.meta.find(meta => meta.style && meta.style.startsWith("led"))
      )
        return "led";
      return item.type;
    }

    if (
      item.type === "hslider" ||
      item.type === "nentry" ||
      item.type === "vslider"
    ) {
      if (
        item.meta &&
        item.meta.find(meta => meta.style && meta.style.startsWith("knob"))
      )
        return "knob";

      if (
        item.meta &&
        item.meta.find(meta => meta.style && meta.style.startsWith("menu"))
      )
        return "menu";
      if (
        item.meta &&
        item.meta.find(meta => meta.style && meta.style.startsWith("radio"))
      )
        return "radio";
    }
    return item.type;
  }

  static injectLayout(ui) {
    ui.forEach(item => {
      // si c'est un groupe, appel récursif
      if ("items" in item) this.injectLayout(item.items);

      // sinon on injecte les propriétés width, height, sizing
      else item.layout = { ...Layout.itemLayoutMap[this.predictType(item)] };
    });
    return ui;
  }

  // On va calculer les width et height de l'objet layout associé à chaque élément (groupes compris)
  static adjustLayout(uiInjected, directionIn) {
    const groupLayout = {
      width: this.padding * 2,
      height: this.padding * 2 + this.labelHeight,
      sizing: "none"
    };

    const direction = directionIn || "vertical";
    let tabs = 0;
    uiInjected.forEach(item => {
      if (item.type === "hgroup")
        item.layout = this.adjustLayout(item.items, "horizontal");
      else if (item.type === "vgroup")
        item.layout = this.adjustLayout(item.items, "vertical");
      else if (item.type === "tgroup") {
        item.layout = this.adjustLayout(item.items, "stacked");
        tabs++;
      }
      if (direction === "horizontal") {
        groupLayout.width += item.layout.width + this.spaceBetween;
        groupLayout.height = Math.max(
          groupLayout.height,
          item.layout.height + 2 * this.padding + this.labelHeight
        );
      } else if (direction === "vertical") {
        groupLayout.width = Math.max(
          groupLayout.width,
          item.layout.width + 2 * this.padding
        );
        groupLayout.height += item.layout.height + this.spaceBetween;
      } else {
        groupLayout.width = Math.max(
          groupLayout.width,
          item.layout.width + 2 * this.padding
        );
        groupLayout.height = Math.max(
          groupLayout.height,
          item.layout.height + 2 * this.padding + this.labelHeight
        );
      }
    });
    if (direction === "horizontal") groupLayout.width -= this.spaceBetween;
    else if (direction === "vertical") groupLayout.height -= this.spaceBetween;
    if (tabs) {
      groupLayout.height += this.itemLayoutMap.tab.height;
      groupLayout.width = Math.max(
        groupLayout.width,
        tabs * this.itemLayoutMap.tab.width + 2 * this.padding
      );
    }
    uiInjected.forEach(item => {
      if (
        directionIn !== "horizontal" &&
        (item.layout.sizing === "both" || item.layout.sizing === "horizontal")
      )
        item.layout.width = groupLayout.width - 2 * this.padding;
      if (
        directionIn !== "vertical" &&
        (item.layout.sizing === "both" || item.layout.sizing === "vertical")
      )
        item.layout.height =
          groupLayout.height - 2 * this.padding - this.labelHeight;
    });
    return groupLayout;
  }

  // calcul des top et left css en fonction de la hiérarchie et des width et height
  static offsetLayout(uiAdjusted, directionIn, layoutIn) {
    const direction = directionIn || "vertical";
    let $left = 0;
    let $top = this.padding + this.labelHeight;
    const { width, height } = layoutIn;
    uiAdjusted.forEach(item => {
      item.layout.left = $left;
      item.layout.top = $top;
      // center the item
      if (direction === "horizontal" || direction === "stacked")
        item.layout.top = (height - item.layout.height) / 2 - this.padding;
      else if (direction === "vertical" || direction === "stacked")
        item.layout.left = (width - item.layout.width) / 2 - this.padding;
      if (item.type === "hgroup")
        this.offsetLayout(item.items, "horizontal", item.layout);
      else if (item.type === "vgroup")
        this.offsetLayout(item.items, "vertical", item.layout);
      else if (item.type === "tgroup")
        this.offsetLayout(item.items, "stacked", item.layout);
      if (direction === "horizontal")
        $left += item.layout.width + this.spaceBetween;
      else if (direction === "vertical")
        $top += item.layout.height + this.spaceBetween;
    });
    return uiAdjusted;
  }

  static calcLayout(ui) {
    Layout.injectLayout(ui);
    const layout = this.adjustLayout(ui);
    this.offsetLayout(ui, "vertical", layout);
    layout.left = 0;
    layout.top = 0;
    return { ui: ui, layout: layout };
  }
}
Layout.padding = 0.1;
Layout.labelHeight = 0.1;
Layout.spaceBetween = 0.25;

Layout.itemLayoutMap = {
  hslider: {
    width: 5,
    height: 1,
    sizing: "none"
  },
  vslider: {
    width: 1,
    height: 5,
    sizing: "vertical"
  },
  nentry: {
    width: 3,
    height: 1,
    sizing: "horizontal"
  },
  button: {
    width: 2,
    height: 1,
    sizing: "horizontal"
  },
  checkbox: {
    width: 2,
    height: 1.5,
    sizing: "none"
  },
  knob: {
    width: 1,
    height: 2,
    sizing: "none"
  },
  menu: {
    width: 3,
    height: 1,
    sizing: "horizontal"
  },
  radio: {
    width: 2,
    height: 2,
    sizing: "both"
  },
  led: {
    width: 1,
    height: 1,
    sizing: "none"
  },
  hbargraph: {
    width: 5,
    height: 1,
    sizing: "horizontal"
  },
  vbargraph: {
    width: 1,
    height: 5,
    sizing: "vertical"
  },
  tab: {
    width: 1,
    height: 2,
    sizing: "none"
  }
};
