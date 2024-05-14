import { BooleanNumber } from '@univerjs/core';
import { ptToPixel } from '@univerjs/engine-render';

export const DEFAULT_DOCUMENT_DATA_CN = {
    id: 'default-document-id',
    body: {
        dataStream: "\rHello world\r\n",
        textRuns: [],
        paragraphs: [
            {
                startIndex: 0,
                paragraphStyle: {
                    spaceAbove: 10,
                    lineSpacing: 2,
                    spaceBelow: 0,
                },
            },

        ],
        sectionBreaks: []
    },
    documentStyle: {
        pageSize: {
            width: ptToPixel(595),
            height: ptToPixel(842),
        },
        marginTop: ptToPixel(50),
        marginBottom: ptToPixel(50),
        marginRight: ptToPixel(40),
        marginLeft: ptToPixel(40),
        renderConfig: {
            vertexAngle: 0,
            centerAngle: 0,
        },
    },
};
