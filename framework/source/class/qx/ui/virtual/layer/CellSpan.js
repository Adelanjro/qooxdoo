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

************************************************************************ */

qx.Class.define("qx.ui.virtual.layer.CellSpan",
{
  extend : qx.ui.virtual.layer.HtmlCell,
  
  construct : function(htmlCellProvider, rowConfig, columnConfig)
  {
    this.base(arguments, htmlCellProvider);      
    this._spanManager = new qx.ui.virtual.layer.CellSpanManager(rowConfig, columnConfig);
  },

  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    setCellSpan : function(row, column, rowSpan, columnSpan)
    {
      var id = row + "x" + column;
      this._spanManager.removeCell(id);
      if (rowSpan > 1 || columnSpan > 1) {        
        this._spanManager.addCell(id, row, column, rowSpan, columnSpan);
      }
      qx.ui.core.queue.Widget.add(this);
    },
    
    
    fullUpdate : function(
      firstRow, lastRow, 
      firstColumn, lastColumn, 
      rowSizes, columnSizes
    )
    {
      var html = [];
      
      var cells = this._spanManager.findCellsInWindow(
        firstRow, lastRow,
        firstColumn, lastColumn
      );
      
      if (cells.length > 0)
      {
        var bounds = this._spanManager.getCellBounds(cells, firstRow, firstColumn);
        var spanMap = this._spanManager.computeCellSpanMap(
          cells,
          firstRow, lastRow,
          firstColumn, lastColumn
        );
        
        // render spanning cells
        for (var i=0, l=cells.length; i<l; i++)
        {
          var cell = cells[i];
          var cellBounds = bounds[i];
          html.push(this._cellProvider.getCellHtml(
            cell.firstRow, cell.firstColumn,
            cellBounds.left, cellBounds.top,
            cellBounds.width, cellBounds.height
          ));
        }         
      }
      else
      {
        // create empty dummy map
        spanMap = [];
        for (var i=firstRow; i<= lastRow; i++) {
          spanMap[i] = [];
        }
      }
      
      // render non spanning cells
      var left = 0;
      var top = 0;
      var row = firstRow;
      var column = firstColumn;
      for (var x=0; x<rowSizes.length; x++)
      {
        var left = 0;
        var column = firstColumn;
        var height = rowSizes[x] 
        for(var y=0; y<columnSizes.length; y++)
        {          
          var width = columnSizes[y];
          
          if (!spanMap[row][column])
          {
            html[html.length] = this._cellProvider.getCellHtml(
              row, column,
              left, top,
              width, height
            );
          }

          column++;
          left += width;          
        }
        top += height;
        row++;
      }            
      
      this.getContentElement().setAttribute("html", html.join(""));    
      
      this._firstRow = firstRow;
      this._lastRow = lastRow;
      this._firstColumn = firstColumn;
      this._lastColumn = lastColumn;
      this._rowSizes = rowSizes;
      this._columnSizes = columnSizes;      
    }
  }
});