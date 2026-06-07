import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post()
    create(@Body() body: Partial<Report>) {
        return this.reportsService.create(body);
    }

    @Get()
    findAll() {
        return this.reportsService.findAll();
    }

    @Get('stats')
    getStats() {
        return this.reportsService.getStats();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reportsService.findOne(id);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: string,
    ) {
        return this.reportsService.updateStatus(id, status);
    }

    @Patch(':id/upvote')
    upvote(@Param('id', ParseIntPipe) id: number) {
        return this.reportsService.upvote(id);
    }
}