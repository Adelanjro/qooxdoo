/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   * Fabian Jakobs (fjakobs)
   * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

qx.Class.define("demobrowser.demo.virtual.ListComplex",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      var scroller = new qx.ui.virtual.core.Scroller(50, 2000, 32, 120);
      scroller.pane.setWidth(450);

      // change 8 sizes
      for (var i=2; i<10; i++)
      {
        scroller.pane.rowConfig.setItemSize(i, 20 + Math.round(Math.random() * 40));
        scroller.pane.columnConfig.setItemSize(i, 50 + Math.round(Math.random() * 80));
      }

      
      
      this.getRoot().add(scroller, {left : 20, top : 10});
      scroller.pane.addLayer(new qx.ui.virtual.layer.Row());
      scroller.pane.addLayer(new qx.ui.virtual.layer.GridLines("horizontal"));
      //scroller.pane.addLayer(new qx.ui.virtual.layer.GridLines("vertical"));            
      scroller.pane.addLayer(new demobrowser.demo.virtual.DemoLayer);
    }
  }
});
